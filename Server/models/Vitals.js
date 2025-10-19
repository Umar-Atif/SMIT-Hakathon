const mongoose = require("mongoose");

const vitalsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    date: { type: Date, default: Date.now },
    bp: { type: String },
    sugar: { type: Number },
    weight: { type: Number },
    notes: { type: String },
    aiSummary: { type: Object, default: {} }, // Gemini AI suggestions
});

const Vitals = mongoose.model("Vitals", vitalsSchema);
module.exports = Vitals;
