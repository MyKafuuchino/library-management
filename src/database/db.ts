import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export async function connectToDatabase() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "library_management",
  });
}

export async function getDatabase() {
  if (!dbInstance) {
    const connection = await connectToDatabase();
    dbInstance = drizzle(connection);
  }
  return dbInstance;
}
