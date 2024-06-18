/**
 * Inspired from https://www.youtube.com/watch?v=CnH3kAXSrmU
 */

import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import path from "path";

import { checkDbConnection, logDbDetails } from "./db.js";

// Import dirname
import { __dirname } from "./utils/dirname.js";

// Import routes
import auth from "./routes/auth.js";
import discussions from "./routes/discussions.js";
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
    origin: [
      "http://localhost:3000",
      "https://itsecwb-aawj.xyz",
      "http://localhost:4173",
    ],
    credentials: true,
  })
);
app.use(express.json()); // Able to send JSON data
app.use(express.urlencoded({ extended: true })); // Able to send form data
app.use(logger);
app.use(
  helmet({
    // To fix The resource at “http://localhost:8000/assets/AFAC%20(square).png” was blocked due to its Cross-Origin-Resource-Policy header (or lack thereof). See https://developer.mozilla.org/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)#
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    store: new session.MemoryStore(),
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  })
);

// Static folder
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(fileUpload());

// Health check
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Hello World from API",
  });
});

// Use routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/discussions", discussions);

// Catch all error
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  logDbDetails();
  await checkDbConnection();
});
