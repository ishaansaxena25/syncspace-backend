import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import type { RegisterInput } from "../schemas/auth.schema.js";

export async function register(req: Request, res: Response) {
  try {
    const input = req.body as RegisterInput;
    const user = await authService.registerUser(input);

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return res.status(409).json({
          message: "User already exists",
        });
      }
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
