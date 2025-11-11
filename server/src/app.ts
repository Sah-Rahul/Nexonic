import dotenv from "dotenv"
dotenv.config()
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import userRouter from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app: Application = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

app.use('/api/v1/auth', userRouter)


app.use(errorMiddleware)
export default app;
