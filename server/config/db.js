import { Client } from "pg";
import dotenv from "dotenv";

<<<<<<< HEAD

dotenv.config();

 
=======
// dotenv.config({ path: "./config/config.env" });
dotenv.config();

console.log(process.env.DB_PASSWORD);

>>>>>>> 7a76f22615d9b02a0345d46e691c39ac5d0d233c
const database = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

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
