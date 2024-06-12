import mysql from "mysql";
import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "itsecwb",
});

const poolForRateLimiter = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "itsecwb",
});

export { pool, poolForRateLimiter };
