import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const joinRoomHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        // Fix 1: Cast as string right here so TypeScript stops complaining everywhere else
        const roomId = req.params.roomId as string;

        if (!roomId) {
            res.status(404).json({ msg: "Please enter a valid Room ID" });
            return; // Fix 2: Added return so the code stops executing here
        }

        const room = await prismaClient.room.findUnique({
            where: { id: roomId }, // Fix 3: Standard object syntax now that roomId is definitely a string
            include: {
                users: {
                    select: { id: true, name: true, email: true, photo: true }
                }
            }
        });

        if (!room) {
            res.status(404).json({ msg: "Incorrect Room ID or Room doesn't exist" });
            return;
        }

        // const isUserAlreadyInRoom = room.users.some(user => user.id === userId);
        // if (isUserAlreadyInRoom) {
        //     res.status(400).json({ message: "User already in room" });
        //     return;
        // }

        const updatedRoom = await prismaClient.room.update({
            where: { id: roomId }, // Fixed syntax here too
            data: {
                users: { connect: { id: userId } }
            },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        photo: true,
                    }
                }
            }
        });

        res.status(200).json(updatedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};