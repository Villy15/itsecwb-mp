import colors from "colors";
// import fs for file system
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// create a __dirname variable to store the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// create a logFilePath so that we can write logs to a file
const logFilePath = path.join(__dirname, "../logs/access.log");

const logger = (req, res, next) => {
  const methodColors = {
    GET: colors.green,
    POST: colors.blue,
    PUT: colors.yellow,
    DELETE: colors.white,
  };

  const color = methodColors[req.method] || colors.white;
  // create a log message
  const logMessage = `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`;

  // write the log message to the log file
  fs.appendFileSync(logFilePath, color(logMessage) + "\n");

  console.log(
    color(
      `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
    )
  );

  next();
};

export default logger;
