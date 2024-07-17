import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// create a __dirname variable to store the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// create a folder called logs
const logFolder = path.join(__dirname, "../logs");
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder, { recursive: true });

}

// generate a filename based on the current date
const currentDate = new Date();
const currentDateString = currentDate.toISOString().split("T")[0];
const logFileName = `${currentDateString}.log`;

// create a file called access.txt
const logFilePath = path.join(logFolder, logFileName);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/log", (req, res) => {
    const logMessage = req.body.logMessage;
    console.log(logMessage);

    fs.appendFile(logFilePath, `${logMessage}\n`, (err) => {
        if (err) {
            console.error('Failed to write log to file.', err);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});