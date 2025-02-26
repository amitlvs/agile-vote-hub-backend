const { Pool } = require("pg");
require("dotenv").config();

// DB_USER = postgres;
// DB_HOST = localhost;
// DB_NAME = agile_vote;
// DB_PASSWORD = 0000;
// DB_PORT = 5432;
// PORT = 8000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "agile_vote",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
