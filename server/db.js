const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "itsecwb",
});

module.exports = pool.promise();