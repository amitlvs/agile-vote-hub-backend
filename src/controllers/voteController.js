const pool = require("../config/db");

const castVote = async (req, res) => {
  const { session_id, user_id, value } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO votes (session_id, user_id, value) VALUES ($1, $2, $3) ON CONFLICT (session_id, user_id) DO UPDATE SET value = EXCLUDED.value RETURNING *",
      [session_id, user_id, value]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

const getVotes = async (req, res) => {
  const { session_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT user_id, value FROM votes WHERE session_id = $1",
      [session_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { castVote, getVotes };
