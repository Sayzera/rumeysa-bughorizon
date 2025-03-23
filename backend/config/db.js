import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("📦 PostgreSQL bağlantısı başarılı!");
});

export default pool;
