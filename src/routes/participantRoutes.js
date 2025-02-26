const express = require("express");
const {
  addParticipant,
  getParticipants,
} = require("../controllers/participantController");
const router = express.Router();

router.post("/", addParticipant);
router.get("/:session_id", getParticipants);

module.exports = router;
