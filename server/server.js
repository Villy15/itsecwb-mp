/**
 * Inspired from https://www.youtube.com/watch?v=CnH3kAXSrmU
 */

import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";

// Import dirname
import { __dirname } from "./utils/dirname.js";

// Import routes
import auth from "./routes/auth.js";
import users from "./routes/users.js";

// Import middleware
import fileUpload from "express-fileupload";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/not-found.js";

const port = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(
  cors({
    // Allow only the frontend to access the backend
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); // Able to send JSON data
app.use(express.urlencoded({ extended: true })); // Able to send form data
app.use(logger);
app.use(helmet());

// Static folder
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(fileUpload());

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
