const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const reportRoutes = require("./routes/reportRoutes");

const express = require('express');
const app = express();

//Database
let isConnected = false;
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "Ecommerce" });
        isConnected = true;
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}
app.use((req, res, next) => {
    if (!isConnected) connectDB();
    next();
});

// Middlewares
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.get('/', (req, res) => {
    res.send("HealthMate API running...")
});

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/reports", reportRoutes);

// app.listen(process.env.PORT, () => {
//     console.log("Server is running")
// });
module.exports = app;