const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const { addReport, getReports, getReport } = require("../controllers/reportController");

const express = require("express");
const router = express.Router();

// Add new report (with file uploads)
router.post("/", protect, upload.array("files", 5), addReport);

// Get all reports for a member
router.get("/member/:memberId", protect, getReports);

// Get single report
router.get("/:id", protect, getReport);

module.exports = router;
