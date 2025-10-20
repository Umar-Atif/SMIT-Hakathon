// controllers/reportController.js
const Report = require("../models/Report");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

// ✅ Add new report
const addReport = async (req, res) => {
    try {
        const { member, title, testName, hospital, doctor, date, price, additionalNotes,
            bpSystolic, bpDiastolic, temp, fastingSugar, height, weight } = req.body;

        if (!member || !testName || !hospital || !doctor || !date || !price) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // Files upload
        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, { folder: "HealthMateReports" });
                uploadedFiles.push(result.secure_url);
                fs.unlinkSync(file.path); // Remove temp file
            }
        }

        // Create report
        const report = new Report({
            user: req.user._id,
            member,
            title: title || "",
            testName,
            hospital,
            doctor,
            date,
            price,
            additionalNotes: additionalNotes || "",
            files: uploadedFiles,
            bpSystolic, bpDiastolic, temp, fastingSugar, height, weight
        });

        await report.save();
        res.status(201).json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding report" });
    }
};

// ✅ Get all reports for a member
const getReports = async (req, res) => {
    try {
        const { memberId } = req.params;
        const reports = await Report.find({ user: req.user._id, member: memberId }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching reports" });
    }
};

// ✅ Get single report
const getReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findOne({ _id: id, user: req.user._id });
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching report" });
    }
};

module.exports = { addReport, getReports, getReport };
