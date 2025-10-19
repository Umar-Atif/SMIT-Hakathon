const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes"); 

const express = require('express');
const app = express();

//Database
mongoose.connect(process.env.MONGO_URI, { dbName: "HealthMate" }) 
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => {
        console.error(err)
    });

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
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
app.use("/api/health", healthRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running")
});
