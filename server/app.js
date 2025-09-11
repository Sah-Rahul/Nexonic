// server.js

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
config({ path: "./config/config.env" });

// Validate required environment variables
if (!process.env.FRONTEND_URL || !process.env.DASHBOARD_URL) {
  console.error("❌ FRONTEND_URL or DASHBOARD_URL not defined in .env");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 4000;

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: uploadDir,
}));

// CORS setup
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

export default app