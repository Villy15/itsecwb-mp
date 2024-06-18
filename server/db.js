// import mysql from "mysql";
import { createPool } from "mysql2/promise";

const isProduction = process.env.NODE_ENV === "production";

const pool = createPool({
  host: isProduction ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
  port: isProduction ? process.env.PROD_DB_PORT : process.env.DEV_DB_PORT,
  user: isProduction ? process.env.PROD_DB_USER : process.env.DEV_DB_USER,
  password: isProduction
    ? process.env.PROD_DB_PASSWORD
    : process.env.DEV_DB_PASSWORD,
  database: isProduction ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME,
});

// const poolForRateLimiter = mysql.createPool({
//   host: "roundhouse.proxy.rlwy.net",
//   port: 25350,
//   user: "root",
//   password: "CqSgBziYHewCgnVesLPIdYHJsPdlHOZZ",
//   database: "railway",
// });

export async function checkDbConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export function logDbDetails() {
  console.log("Database connection details:");
  console.log(
    "Host:",
    isProduction ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST
  );
  console.log(
    "Port:",
    isProduction ? process.env.PROD_DB_PORT : process.env.DEV_DB_PORT
  );
  console.log(
    "User:",
    isProduction ? process.env.PROD_DB_USER : process.env.DEV_DB_USER
  );
  console.log(
    "Database:",
    isProduction ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME
  );
}

export { pool };
