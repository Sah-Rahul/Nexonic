import { Client } from "pg";
import dotenv from "dotenv";

// Load env variables here, BEFORE accessing process.env
dotenv.config({ path: "./config/config.env" });  // Adjust relative path if needed

const database = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

console.log('first')

console.log("DB_PASSWORD =>", process.env.DB_PASSWORD);
console.log("DB_NAME =>", process.env.DB_NAME);
console.log("DB_HOST =>", process.env.DB_HOST);

const connectDB = async () => {
  try {
    await database.connect();
    console.log("✅ Connected to PostgreSQL database");
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

export default database;
