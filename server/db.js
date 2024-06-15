import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "roundhouse.proxy.rlwy.net",
  port: 25350,
  user: "root",
  password: "CqSgBziYHewCgnVesLPIdYHJsPdlHOZZ",
  database: "itsecwb",
});

// const poolForRateLimiter = mysql.createPool({
//   host: "roundhouse.proxy.rlwy.net",
//   port: 25350,
//   user: "root",
//   password: "CqSgBziYHewCgnVesLPIdYHJsPdlHOZZ",
//   database: "railway",
// });

export { pool };
