const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const reportRoutes = require("./routes/reportRoutes");

const express = require('express');
const app = express();

// ✅ Connect to MongoDB once (Vercel-friendly)
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "Ecommerce" });
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};
connectDB();

// ✅ CORS setup (allow frontend URLs)
app.use(cors({
    origin: [
        "http://localhost:5173",                  // local dev
        "https://healthmate-frontend.vercel.app"  // 👈 replace with your actual frontend URL
    ],
    credentials: true,
}));

// ✅ Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.get('/', (req, res) => {
    res.send("HealthMate API running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/reports", reportRoutes);

// ✅ Export for Vercel serverless
module.exports = app;
