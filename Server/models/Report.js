const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }, 
    member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },

    // Required fields
    testName: { type: String, required: true },
    hospital: { type: String, required: true },
    doctor: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    
    // Optional fields
    files: [{ type: String, default: "" }],
    title: { type: String, default: "" },
    additionalNotes: { type: String, default: "" },

    // Optional manual vitals
    bpSystolic: { type: Number, default: null },
    bpDiastolic: { type: Number, default: null },
    temp: { type: Number, default: null },
    fastingSugar: { type: Number, default: null },
    height: { type: Number, default: null },
    weight: { type: Number, default: null },

}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
