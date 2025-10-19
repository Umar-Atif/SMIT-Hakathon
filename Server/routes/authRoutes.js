const { registerUser, loginUser, logoutUser, getProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", logoutUser);

// Profile
router.get("/profile", protect, getProfile);

module.exports = router;