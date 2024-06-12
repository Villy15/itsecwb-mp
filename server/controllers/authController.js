import bcrypt from "bcrypt";
import path from "path";
import { pool } from "../db.js";
import { __dirname } from "../utils/dirname.js";
/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password, recaptchaToken } = req.body;

    console.log({
      email,
      password,
      recaptchaToken,
    });

    if (!recaptchaToken)
      return res.status(400).json({ message: "Recaptcha token is required" });

    // Check if recaptcha token is valid
    // FROM https://developers.google.com/recaptcha/docs/verify
    const captchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SITE_KEY_V2}&response=${recaptchaToken}`,
      {
        method: "POST",
      }
    );

    const captchaData = await captchaResponse.json();
    console.log(captchaData);

    if (!captchaData.success)
      return res.status(400).json({ message: "Invalid recaptcha token" });

    // Check if email exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // If no rows are found, return an error
    if (rows.length === 0) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, rows[0].password);

    // If password is incorrect, return an error
    if (!match) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "User logged in successfully" });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

/**
 * @desc Register user
 * @route POST /api/auth/register
 */

export const register = async (req, res, next) => {
  try {
    // Destructures the request body
    const { email, first_name, last_name, phone } = req.body;

    // Checks if email already exists !! I'm not sure if dapat malaman nila if user already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if photo is uploaded
    // from https://github.com/richardgirges/express-fileupload/tree/master/example
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // Uploads the photo to the server the assets folder
    const photo = req.files.photo_url;
    const uploadPath = path.join(__dirname, "assets", photo.name);
    await photo.mv(uploadPath);
    // Initializes the photo_url for the database
    const photo_url = `http://localhost:${process.env.PORT}/assets/${photo.name}`;

    // Hashes the password
    const hash = await bcrypt.hash(req.body.password, 10);

    const [rows] = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name, photo_url, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [email, hash, first_name, last_name, photo_url, phone]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
