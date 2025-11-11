import dotenv from "dotenv"
dotenv.config()
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";

const app: Application = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

export default app;
