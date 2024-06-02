import db from "../db.js";

/**
 * @desc Get all posts
 * @route GET /api/users
 */
export const getUsers = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM users"); // Adjust the query as needed
    res.json(rows);
  } catch (err) {
    const error = new Error("An error occurred while processing your request");
    return next(error);
  }
};
