/**
 * Inspired from https://www.youtube.com/watch?v=CnH3kAXSrmU
 */

import cors from "cors";
import express from "express";

// Import routes
import auth from "./routes/auth.js";
import users from "./routes/users.js";

// Import middleware
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/not-found.js";

const port = process.env.PORT || 5000;
const app = express();

console.log("Port ", process.env.PORT);

// Middlewares
app.use(cors());
app.use(express.json()); // Able to send JSON data
app.use(express.urlencoded({ extended: true })); // Able to send form data
app.use(logger);

// Health check
app.get("/api", (req, res) => {
  res.json({
    message: "Hello World from API",
  });
});

// Use routes
app.use("/api/users", users);
app.use("/api/auth", auth);

// Catch all error
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
