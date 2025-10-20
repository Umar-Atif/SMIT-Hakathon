const { addMember, getMembers, editMember, deleteMember } = require("../controllers/memberController");
const { protect } = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

// Add new member
router.post("/", protect, addMember);

// Get all members of logged-in user
router.get("/", protect, getMembers);

// Edit member by ID
router.put("/:id", protect, editMember);

// Delete member by ID
router.delete("/:id", protect, deleteMember);

module.exports = router;
