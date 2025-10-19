const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true }, 
    date: { type: Date, default: Date.now },
    aiSummary: { type: Object, default: {} }, 
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
