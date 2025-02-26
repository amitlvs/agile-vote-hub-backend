const express = require("express");
const {
  castVote,
  getVotes,
  // revealVotes,
} = require("../controllers/voteController");
const router = express.Router();

router.post("/", castVote);
router.get("/:session_id", getVotes);
// router.post("/reveal/:session_id", revealVotes);

module.exports = router;
