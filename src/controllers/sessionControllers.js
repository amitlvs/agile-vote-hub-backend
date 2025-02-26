const pool = require("../config/db");

const createSession = async (req, res) => {
  const {
    name,
    description,
    created_by_id,
    created_by_name = "Anonymous",
  } = req.body;

  console.log(req.body, "checkkkkkk");
  const sessionCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    const result = await pool.query(
      "INSERT INTO sessions (code, name, description, created_by_id, created_by_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [sessionCode, name, description, created_by_id, created_by_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const getSessions = async (req, res) => {
  const { sessionId } = req.params;

  try {
    console.log("ses", sessionId);
    const result = await pool.query("SELECT * FROM sessions WHERE id = $1", [
      sessionId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

const getSessionByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query("SELECT * FROM sessions WHERE id = $1", [
      code,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

const revealVotes = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const result = await pool.query(
      "UPDATE sessions SET is_reveal_votes = TRUE WHERE id = $1 RETURNING *",
      [sessionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json({
      message: "Votes revealed successfully",
      session: result.rows[0],
    });
  } catch (error) {
    console.error("Error revealing votes:", error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { createSession, getSessions, getSessionByCode, revealVotes };
