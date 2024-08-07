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
import comments from "./routes/comments.js";

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

app.use((req, res, next) => {
  res.requestTime = Date.now();

  next();
});

app.use(logger);
app.use(
  helmet({
    // To fix The resource at “http://localhost:8000/assets/AFAC%20(square).png” was blocked due to its Cross-Origin-Resource-Policy header (or lack thereof). See https://developer.mozilla.org/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)#
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  session({
    // openssl rand -hex 32
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    rolling: true, // Reset the session maxAge on every request
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: "itsecwb-session", // This will be unique per-host.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for production, 'lax' for other environments
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
    },
  })
);

// Ensure to enable 'trust proxy' if using a reverse proxy like Heroku
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

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
app.use("/api/comments", comments);

// Catch all error
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`${typeof port}`);
  console.log(`Server is running on port ${port}`);
  logDbDetails();
  await checkDbConnection();
});
