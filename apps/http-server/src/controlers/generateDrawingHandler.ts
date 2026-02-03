import { Request, Response } from "express";
import axios from "axios";
import z from "zod";
import { createFlowchartPrompt, createObjectDrawingPrompt, generateUniqueId } from "../lib/utils";
import { prismaClient } from "@repo/db/client";

const drawingSchema = z.object({
  type: z.enum(["OBJECT", "FLOWCHART"]),
  content: z.string(),
  roomId: z.string()
});

// --- HELPER 1: Sleep function ---
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- HELPER 2: Retry Wrapper for Gemini API ---
// This handles the 429 error by waiting and retrying automatically.
async function callGeminiWithRetry(url: string, payload: any, config: any, retries = 3): Promise<any> {
  try {
    return await axios.post(url, payload, config);
  } catch (error: any) {
    if (retries > 0 && error?.response?.status === 429) {
      console.warn(`Gemini Rate Limit Hit (429). Waiting 5s... (${retries} retries left)`);
      // Wait 5 seconds before retrying (Gemini Free Tier often needs ~4-5s buffer)
      await delay(5000);
      return callGeminiWithRetry(url, payload, config, retries - 1);
    }
    // If it's not a 429 or we ran out of retries, throw the error
    throw error;
  }
}

export const generateDrawingHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const zodResponse = drawingSchema.safeParse(body);

    if (!zodResponse.success) {
      res.status(401).json({ msg: "Invalid inputs" });
      console.error("Zod error: ", zodResponse.error);
      return;
    }

    const { type, content, roomId } = zodResponse.data;
    // @ts-ignore - assuming req.user exists from middleware
    const userId = req.user?.id; 

    const checkRoom = await prismaClient.room.findUnique({
      where: { id: roomId }
    });

    if (!checkRoom) {
      res.status(401).json({ msg: "Room not found" });
      return;
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      res.status(500).json({ msg: "Missing API key" });
      return;
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

    // --- OBJECT GENERATION ---
    if (type === "OBJECT") {
      const prompt = createObjectDrawingPrompt(content, roomId, userId);

      // Use the retry wrapper here too, just in case
      const response = await callGeminiWithRetry(
        geminiUrl,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 4096,
          }
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      const cleanedResponse = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      let shapesArray;
      try {
        shapesArray = JSON.parse(cleanedResponse);
      } catch (err) {
        const match = cleanedResponse.match(/\[.*\]/s);
        if (match) {
          try {
            shapesArray = JSON.parse(match[0]);
          } catch (e) {
            throw new Error("Response is not valid JSON array");
          }
        } else {
          throw new Error("Response is not valid JSON array");
        }
      }

      if (!Array.isArray(shapesArray)) {
        throw new Error("Response is not an array");
      }

      const seen = new Set();
      const processedShapes = shapesArray.filter((shape: any) => {
        const dedupeKey = JSON.stringify({
          type: shape.type, x: shape.x, y: shape.y,
          width: shape.width, height: shape.height,
          radiusX: shape.radiusX, radiusY: shape.radiusY,
          textContent: shape.textContent, points: shape.points
        });
        if (seen.has(dedupeKey)) return false;
        seen.add(dedupeKey);
        return true;
      }).map((shape: any) => ({
        ...shape,
        id: shape.id || generateUniqueId(),
        roomId: shape.roomId || roomId,
        userId: shape.userId || userId
      }));

      res.status(200).json({ result: processedShapes, originalPrompt: content });
    }
    
    // --- FLOWCHART GENERATION ---
    else if (type === "FLOWCHART") {
      const MAX_TOTAL_SHAPES = 30;
      const CHUNK_SIZE = 5;
      const MAX_ITER = 10;

      let allShapes: any[] = [];
      let done = false;
      let iter = 0;

      while (!done && allShapes.length < MAX_TOTAL_SHAPES && iter < MAX_ITER) {
        const prompt = createFlowchartPrompt(content, roomId, userId) +
          (allShapes.length > 0
            ? `\n\nHere are the shapes generated so far:\n${JSON.stringify(allShapes, null, 2)}\nContinue the flowchart by generating the next ${CHUNK_SIZE} shapes. Do not repeat any previous shapes. Return ONLY a valid JSON array of the next shapes. If finished, return [].`
            : `\n\nStart the flowchart by generating the first ${CHUNK_SIZE} shapes. Return ONLY a valid JSON array of shapes.`) +
          `\nIMPORTANT: Return ONLY a valid JSON array of shapes. No explanations, no markdown, no extra text. If there are no more shapes, return [].`;

        try {
          // 1. Use Retry Wrapper
          const response = await callGeminiWithRetry(
            geminiUrl,
            {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 2048,
              },
            },
            { headers: { "Content-Type": "application/json" } }
          );

          const resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
          const cleanedResponse = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

          let shapesArray: any[] = [];
          try {
            shapesArray = JSON.parse(cleanedResponse);
          } catch (err) {
            const match = cleanedResponse.match(/\[[\s\S]*\]/);
            if (match) {
              try {
                shapesArray = JSON.parse(match[0]);
              } catch (e) {
                console.error("JSON Parse Error (Chunk):", e);
                // If parsing fails for one chunk, we break rather than crashing everything
                break; 
              }
            } else {
              break; 
            }
          }

          if (!Array.isArray(shapesArray) || shapesArray.length === 0) {
            done = true;
            break;
          }

          const seen = new Set(allShapes.map((shape) => JSON.stringify({
            type: shape.type, x: shape.x, y: shape.y,
            width: shape.width, height: shape.height,
            radiusX: shape.radiusX, radiusY: shape.radiusY,
            textContent: shape.textContent, points: shape.points,
          })));

          const newShapes = shapesArray.filter((shape: any) => {
            const dedupeKey = JSON.stringify({
              type: shape.type, x: shape.x, y: shape.y,
              width: shape.width, height: shape.height,
              radiusX: shape.radiusX, radiusY: shape.radiusY,
              textContent: shape.textContent, points: shape.points,
            });
            if (seen.has(dedupeKey)) return false;
            seen.add(dedupeKey);
            return true;
          });

          allShapes = allShapes.concat(newShapes.map((shape: any) => ({
            ...shape,
            id: shape.id || generateUniqueId(),
            roomId: shape.roomId || roomId,
            userId: shape.userId || userId,
          })));

          if (newShapes.length < CHUNK_SIZE) {
            done = true;
          }

          // 2. IMPORTANT: Loop Throttling
          // Wait 4 seconds between chunks to stay under ~15 RPM limit
          if (!done) {
            await delay(4000); 
          }

        } catch (error) {
          console.error("Error in flowchart loop:", error);
          // If a chunk fails even after retries, stop the loop but return what we have so far
          break;
        }

        iter++;
      }

      res.status(200).json({ result: allShapes, originalPrompt: content });
    }

  } catch (error: any) {
    console.error("Error while generating:", error?.response?.data || error.message);
    res.status(500).json({
      msg: "Internal server error",
      error: error?.response?.data || error.message,
    });
  }
};