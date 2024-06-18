/**
 * @desc Get all discussions
 * @route GET /api/disucsions
 */
export const getDiscussions = async (req, res, next) => {
  try {
    // const [rows] = await pool.query("SELECT * FROM discussions");

    // sample rows
    const rows = [
      {
        id: 1,
        created_at: "2021-09-01T00:00:00.000Z",
        title: "Sample Discussion 1",
        description: "Sample Description 1",
        author_id: "Adrian Villanueva",
      },
    ];
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
    // const [rows] = await pool.query("SELECT * FROM discussions WHERE id = ?", [
    //   req.params.id,
    // ]);

    // sample rows

    const rows = [
      {
        id: 1,
        created_at: "2021-09-01T00:00:00.000Z",
        title: "Sample Discussion 1",
        description: "Sample Description 1",
        author_id: "Adrian Villanueva",
      },
    ];

    res.status(200).json(rows[0]);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
