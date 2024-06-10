import bcrypt from "bcrypt";
import path from "path";
import db from "../db.js";
import { __dirname } from "../utils/dirname.js";
/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    // Check if email exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    // If no rows are found, return an error
    if (rows.length === 0) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      return next(error);
    }

    // Check if password is correct
    const match = await bcrypt.compare(req.body.password, rows[0].password);

    // If password is incorrect, return an error
    if (!match) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      return next(error);
    }

    const user = {
      id: rows[0].id,
      email: rows[0].email,
      first_name: rows[0].first_name,
      last_name: rows[0].last_name,
      photo_url: rows[0].photo_url,
    };

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    const error = new Error("An error occurred while processing your request");
    return next(error);
  }
};

/**
 * @desc Register user
 * @route POST /api/auth/register
 */

export const register = async (req, res, next) => {
  try {
    // fromhttps://github.com/richardgirges/express-fileupload/tree/master/example
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const photo = req.files.photo_url;

    // Get the upload path
    const uploadPath = path.join(__dirname, "assets", photo.name);

    // Move the file
    await photo.mv(uploadPath);

    // Hashes the password
    const hash = await bcrypt.hash(req.body.password, 10);

    // Destructures the request body
    const { email, first_name, last_name, phone } = req.body;

    // Checks if email already exists !! I'm not sure if dapat malaman nila if user already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      const error = new Error("Email already exists");
      error.status = 400;
      return next(error);
    }

    const [rows] = await db.query(
      "INSERT INTO users (email, password, first_name, last_name, photo_url, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [email, hash, first_name, last_name, uploadPath, phone]
    );

    const user = {
      id: rows.insertId,
      email,
      first_name,
      last_name,
      uploadPath,
    };

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
