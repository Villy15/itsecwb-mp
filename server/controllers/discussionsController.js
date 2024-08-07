import { pool } from "../db.js";
/**
 * @desc Get all discussions
 * @route GET /api/disucsions
 */
export const getDiscussions = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM discussions");
    res.status(200).json(rows);

    // sample rows
    // const rows = [
    //   {
    //     id: 1,
    //     created_at: "2021-09-01T00:00:00.000Z",
    //     discussion_title: "Sample Discussion 1",
    //     discussion_body: "Sample Description 1",
    //     author_id: "Adrian Villanueva",
    //   },
    // ];
    // res.status(200).json(rows);
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
      "INSERT INTO discussions (discussion_title, discussion_body, author_id, created_at) VALUES (?, ?, ?, NOW())",
      [discussion_title, discussion_body, author_id]
    );

    console.log(result);

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
