const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { addHealthEntry, getTimeline } = require("../controllers/healthController");

const express = require("express");
const router = express.Router();

// Add health entry (vitals + optional file)
router.post("/add", protect, upload.single("file"), addHealthEntry);

// Get timeline
router.get("/timeline", protect, getTimeline);

module.exports = router;
