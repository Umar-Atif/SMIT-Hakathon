const File = require("../models/File");
const Vitals = require("../models/Vitals");
const cloudinary = require("../configs/cloudinary");
const axios = require("axios"); // Gemini HTTP call

// Helper to call Gemini API
const analyzeWithGemini = async (fileUrl) => {
    try {
        const res = await axios.post(
            "https://api.gemini.com/analyze", // replace with actual Gemini endpoint
            { fileUrl },
            { headers: { Authorization: `Bearer ${process.env.GEMINI_KEY}` } }
        );
        return res.data; // expected: { summary, suggestions, etc. }
    } catch (err) {
        console.error("Gemini API error:", err.message);
        return { summary: "AI analysis failed" };
    }
};

// Upload file + Add vitals + Gemini analysis
const addHealthEntry = async (req, res) => {
    try {
        const { bp, sugar, weight, notes } = req.body;
        const userId = req.user._id;

        let fileDoc = null;
        let aiSummary = {};

        // File handling
        if (req.file) {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "healthmate_reports",
            });

            const fileUrl = result.secure_url;

            // Gemini analysis
            aiSummary = await analyzeWithGemini(fileUrl);

            // Save in DB
            fileDoc = await File.create({
                user: userId,
                fileUrl,
                fileType: req.file.mimetype,
                aiSummary,
            });
        }

        // Save vitals
        const vitals = await Vitals.create({
            user: userId,
            bp,
            sugar,
            weight,
            notes,
            aiSummary,
        });

        res.status(201).json({
            message: "Health entry added successfully",
            vitals,
            file: fileDoc,
        });

    } catch (error) {
        console.error("HealthMate entry error:", error);
        res.status(500).json({ message: "Error processing health entry" });
    }
};

// Timeline (all files + vitals)
const getTimeline = async (req, res) => {
    try {
        const userId = req.user._id;

        const files = await File.find({ user: userId }).sort({ date: -1 });
        const vitals = await Vitals.find({ user: userId }).sort({ date: -1 });

        const timeline = [];

        files.forEach(f => timeline.push({
            type: "file",
            id: f._id,
            date: f.date,
            fileUrl: f.fileUrl,
            fileType: f.fileType,
            aiSummary: f.aiSummary,
        }));

        vitals.forEach(v => timeline.push({
            type: "vitals",
            id: v._id,
            date: v.date,
            bp: v.bp,
            sugar: v.sugar,
            weight: v.weight,
            notes: v.notes,
            aiSummary: v.aiSummary,
        }));

        // Sort by newest first
        timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(timeline);

    } catch (error) {
        console.error("Timeline fetch error:", error);
        res.status(500).json({ message: "Error fetching timeline" });
    }
};

module.exports = { addHealthEntry, getTimeline };
