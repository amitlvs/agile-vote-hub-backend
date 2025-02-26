const pool = require("../config/db");

const addParticipant = async (req, res) => {
  const { session_id, user_id, user_name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO participants (session_id, user_id, user_name) VALUES ($1, $2, $3) RETURNING *",
      [session_id, user_id, user_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

const getParticipants = async (req, res) => {
  const { session_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM participants WHERE session_id = $1",
      [session_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { addParticipant, getParticipants };
