import { pool } from "../db.js";
/**
 * @desc Get all discussions
 * @route GET /api/disucsions
 */
export const getDiscussions = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM discussions WHERE enable = 1");
    res.status(200).json(rows);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

/**
 * @desc Get a discussion
 * @route GET /api/discussions/:id
 */
export const getDiscussion = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM discussions WHERE id = ?", [
      req.params.id,
    ]);
    res.status(200).json(rows[0]);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};


export const addDiscussion = async (req, res, next) => {
  try {
    const { discussion_title, discussion_body, author_id } = req.body;

    if (!discussion_title || !discussion_body || !author_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const [result] = await pool.query(
      "INSERT INTO discussions (discussion_title, discussion_body, author_id, created_at, latest_update) VALUES (?, ?, ?, NOW(), NOW())",
      [discussion_title, discussion_body, author_id]
    );

    res.status(201).json({
      id: result.insertId,
      discussion_title,
      discussion_body,
      author_id,
      created_at: new Date().toISOString(),
    });
    
  } catch (err) {
    console.log("Error:", err.message);
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const updateDiscussion = async (req, res, next) => {
  try {
    const { discussion_title, discussion_body } = req.body;
    const { id } = req.params;

    if (!discussion_title || !discussion_body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user is logged in
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.session.user.role === "admin") {
      const [result] = await pool.query(
        "UPDATE discussions SET discussion_title = ?, discussion_body = ?, latest_update = NOW() WHERE id = ?",
        [discussion_title, discussion_body, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Discussion not found or no changes made" });
      }
  
      res.status(200).json({ message: "Discussion updated successfully" });
    }
    else{
      const [discussion] = await pool.query(
        "SELECT author_id FROM discussions WHERE id = ?",
        [id]
      );
  
      if (discussion.length === 0) {
        return res.status(404).json({ message: "Discussion not found" });
      }
  
      if (req.session.user.id !== discussion[0].author_id) {
        return res.status(403).json({ message: `You are not authorized to update this discussion. User ID: ${req.session.user.id}` });
      }

      const [result] = await pool.query(
        "UPDATE discussions SET discussion_title = ?, discussion_body = ?, latest_update = NOW() WHERE id = ?",
        [discussion_title, discussion_body, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Discussion not found or no changes made" });
      }
  
      res.status(200).json({ message: "Discussion updated successfully" });
    }    
  } catch (err) {
    console.log("Error:", err.message);
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

// Doesnt actually delete, but just like make the enable to "0"
export const removeDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.session.user.role === "admin") {
      const [result] = await pool.query(
        "UPDATE discussions SET enable = 0, disabled_date = NOW() WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Discussion not found or no changes made" });
      }  

      res.status(200).json({ message: "Discussion deleted successfully" });
    }
    else{
      const [discussion] = await pool.query(
        "SELECT author_id FROM discussions WHERE id = ?",
        [id]
      );

      if (discussion.length === 0) {
        return res.status(404).json({ message: "Discussion not found" });
      }

      if (req.session.user.id !== discussion[0].author_id) {
        return res.status(403).json({ message: `You are not authorized to delete this discussion. User ID: '${req.session.user.role}'` });
      }

      const [result] = await pool.query(
        "UPDATE discussions SET enable = 0, disabled_date = NOW() WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Discussion not found or no changes made" });
      }

      return res.status(200).json({ message: "Discussion deleted successfully" });
    }
    
  } catch (err) {
    console.log("Error:", err.message);
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM comments");

    // const { id } = req.params;
    // const [rows] = await pool.query(
    //   "SELECT * FROM comments WHERE discussion_id = ?",
    //   [id]
    // );

    res.status(200).json(rows);s
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

