import { pool } from "../db.js";

/**
 * @desc Get comments from a discussion
 * @route GET /api/commnents/:id
 */
export const getComments = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM comments WHERE discussion_id = ? AND enabled = 1", [
      req.params.id,
    ]);
    res.status(200).json(rows);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { discussion_id, author_id, comment_body } = req.body;

    if (!discussion_id || !author_id || !comment_body) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const [result] = await pool.query(
      "INSERT INTO comments (discussion_id, author_id, comment_body) VALUES (?, ?, ?)",
      [discussion_id, author_id, comment_body]
    );

    res.status(201).json({
      id: result.insertId,
      discussion_id,
      author_id,
      comment_body,
      created_date: new Date().toISOString
    });
    
  } catch (err) {
    console.log("Error:", err.message);
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

// Doesnt actually delete, but just like make the enabled to "0"
export const removeComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.session.user.role === "admin") {
      const [result] = await pool.query(
        "UPDATE comments SET enabled = 0, disabled_date = NOW() WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Comments not found or no changes made" });
      }  

      res.status(200).json({ message: "Comments deleted successfully" });
    }
    else{
      const [discussion] = await pool.query(
        "SELECT author_id FROM comments WHERE id = ?",
        [id]
      );

      if (discussion.length === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (req.session.user.id !== discussion[0].author_id) {
        return res.status(403).json({ message: `You are not authorized to delete this comment. User ID: '${req.session.user.role}'` });
      }

      const [result] = await pool.query(
        "UPDATE comments SET enabled = 0, disabled_date = NOW() WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Comment not found or no changes made" });
      }

      return res.status(200).json({ message: "Comment deleted successfully" });
    }
    
  } catch (err) {
    console.log("Error:", err.message);
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
