const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const participantRoutes = require("./routes/participantRoutes");
const voteRoutes = require("./routes/voteRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/votes", voteRoutes);

// setupSocket(io);

// const cron = require("node-cron");
// const { deleteOldGuestUsers } = require("./controllers/userController");

// // Run job every 24 hours
// cron.schedule("0 0 * * *", async () => {
//   await deleteOldGuestUsers();
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
