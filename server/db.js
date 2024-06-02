import { createPool } from "mysql2";

const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "itsecwb",
});

export default pool.promise();
