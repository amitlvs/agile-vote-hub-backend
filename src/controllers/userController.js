const pool = require("../config/db");

// Create User
const createUser = async (req, res) => {
  const { name, email = null, is_guest = false } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, is_guest) VALUES ($1, $2, $3) RETURNING *",
      [name, email, is_guest]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

// Get User by ID
const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Delete Guest Users Older Than 1 Day (Cron Job)
const deleteOldGuestUsers = async () => {
  try {
    await pool.query(
      `DELETE FROM users WHERE is_guest = true AND created_at < NOW() - INTERVAL '1 day'`
    );
    console.log("Deleted old guest users");
  } catch (error) {
    console.error("Error deleting old guest users:", error);
  }
};

module.exports = { createUser, getUser, deleteOldGuestUsers };
