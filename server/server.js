const express = require("express");
const cors = require("cors");
const db = require("./db"); // Import the database configuration

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

app.get("/api", (req, res) => {
  res.json({
    message: "Hello World from API",
  });
});

// Example route to fetch data from MySQL
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users"); // Adjust the query as needed
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
