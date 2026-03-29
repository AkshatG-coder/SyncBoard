import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { generateToken } from "../lib/utils";
import bcrypt from "bcrypt";

export const guestLoginHandler = async (req: Request, res: Response) => {
  try {
    const timestamp = Date.now();
    const guestEmail = `guest_${timestamp}@syncboard.local`;
    const guestName = `Guest ${Math.floor(Math.random() * 10000)}`;
    
    const hashedPassword = await bcrypt.hash("guest_password_secure", 10);

    const newUser = await prismaClient.user.create({
      data: {
        name: guestName,
        email: guestEmail,
        password: hashedPassword,
      }
    });

    generateToken(newUser.id, res);

    res.status(200).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error during guest login:", error);
    res.status(500).json({ msg: "Internal server error while creating guest session" });
  }
};
