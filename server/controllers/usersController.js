import { pool } from "../db.js";

/**
 * @desc Get all posts
 * @route GET /api/users
 */
export const getUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
