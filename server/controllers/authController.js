import db from "../db.js";

/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [req.body.email, req.body.password]
    ); // Adjust the query as needed

    // If no rows are found, return an error
    if (rows.length === 0) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      return next(error);
    }

    res.json(rows);
  } catch (err) {
    const error = new Error("An error occurred while processing your request");
    return next(error);
  }
};
