import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/log", (req, res) => {
    const logMessage = req.body.logMessage;
    console.log(logMessage);

    fs.appendFile("log.txt", `${logMessage}\n`, (err) => {
        if (err) {
            console.error(err);
        }
    });
});