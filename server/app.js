import express from "express";
import cors from "cors";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { createAllTables } from "./utils/createTables.js";

// Import Routes
import userAuth from "./routes/userAuth.routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import productRouter from "./routes/product.routes.js";
import adminRouter from "./routes/admin.routes.js";

// dotenv.config();
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true,
  })
);

createAllTables();

// Routes
app.use('/api/v1/auth', userAuth);  
app.use('/api/v1/product', productRouter);  
app.use('/api/v1/admin', adminRouter);  


app.use(errorMiddleware);
export default app;
