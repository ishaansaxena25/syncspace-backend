// filepath: d:\projects\syncspace-backend\src\services\auth.service.ts
import bcrypt from "bcryptjs";
import { prisma } from "../lib/db.js";
import type { RegisterInput } from "../schemas/auth.schema.js";

export class AuthService {
  async registerUser(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }
}

export const authService = new AuthService();
