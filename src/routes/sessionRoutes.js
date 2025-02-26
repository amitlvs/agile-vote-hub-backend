const express = require("express");
const {
  createSession,
  getSessions,
  getSessionByCode,
  revealVotes,
} = require("../controllers/sessionControllers");
const router = express.Router();

router.post("/", createSession);
router.get("/:sessionId", getSessions);
router.get("/:code", getSessionByCode);
router.post("/reveal/:sessionId", revealVotes);

module.exports = router;
