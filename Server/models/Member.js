const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }, 
    name: { type: String, required: true },
    relation: { type: String, required: true },
    customId: { type: String, default: null }, 
}, { timestamps: true });

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
