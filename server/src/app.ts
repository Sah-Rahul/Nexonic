import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import { errorMiddleware } from "./middleware/error.middleware";

// Routes
import userRouter from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import reviewRouter from "./routes/review.routes";
import orderRouter from "./routes/order.routes";
import statsRouter from "./routes/stats.routes";
import salesRouter from "./routes/sales.routes";
import paymentRouter from "./routes/payment.routes";

const app: Application = express();

connectDB();

 
app.use("/api/v1/payment/webhook", express.raw({ type: "application/json" }));

 
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

// ROUTES  
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/stats", statsRouter);
app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/payment", paymentRouter);

/* ERROR */
app.use(errorMiddleware);

export default app;
