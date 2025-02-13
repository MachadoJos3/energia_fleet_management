import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.JWT_SECRET);
console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);
console.log(process.env.API_BASE_URL);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export default pool;
