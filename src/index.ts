import express, { type Request, type Response } from "express";
import cors from "cors";
import { prisma } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

// Graceful shutdown
const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
