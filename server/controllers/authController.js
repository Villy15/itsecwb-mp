import bcrypt from "bcrypt";
import db from "../db.js";

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

    // log the first row of the result
    console.log(rows[0]);

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
    // Hash the password
    const hash = await bcrypt.hash(req.body.password, 10);

    // Insert user into database
    const { email, first_name, last_name, photo_url } = req.body;

    const [rows] = await db.query(
      "INSERT INTO users (email, password, first_name, last_name, photo_url) VALUES (?, ?, ?, ?, ?)",
      [email, hash, first_name, last_name, photo_url]
    );

    const user = {
      id: rows.insertId,
      email,
      first_name,
      last_name,
      photo_url,
    };

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    const error = new Error("An error occurred while processing your request");
    return next(error);
  }
};
