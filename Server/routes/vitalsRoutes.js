const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { addVitals, getVitals, updateVitals, deleteVitals } = require("../controllers/vitalsController");

// Add new vitals + AI suggestions
router.post("/add-vitals", protect, addVitals);

// Get all vitals (timeline)
router.get("/myvitals", protect, getVitals);

// Update vitals
router.put("/update-vitals/:id", protect, updateVitals);

// Delete vitals
router.delete("/delete-vitals/:id", protect, deleteVitals);

module.exports = router;
