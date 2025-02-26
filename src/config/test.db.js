const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "agile_vote",
  password: "postgres", // Make sure this is correct
  port: 5432, // Default PostgreSQL port
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database Connection Error:", err);
  } else {
    console.log("Connected to Database:", res.rows);
  }
  pool.end();
});
