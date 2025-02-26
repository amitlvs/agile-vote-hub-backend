const { Pool } = require("pg");
require("dotenv").config();

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "agile_vote",
//   password: "postgres",
//   port: 5432,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the environment variable
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false, // Enable SSL for cloud databases
});

module.exports = pool;
