import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
    try {
        // Fix 1: Cast as string right at the extraction point
        const roomId = req.params.roomId as string;

        // Fix 2: Changed to findUnique for better ID querying
        const room = await prismaClient.room.findUnique({
            where: {
                id: roomId
            },
            include: {
                // This include block is perfect and fixes your Error 2!
                users: {
                    select: { id: true, name: true, email: true, photo: true }
                }
            }
        });

        if (!room) {
            res.status(400).json({
                msg: "room not found"
            });
            return;
        }

        res.status(200).json(room.users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};