import { pool } from "../db.js";

/**
 * @desc Get all posts
 * @route GET /api/users
 */
export const getUsers = async (req, res, next) => {
  try {
    console.log(pool);
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

/**
 * @desc Delete a user
 * @route DELETE /api/users/:id
 */

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
