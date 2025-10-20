const Member = require("../models/Member");

// Add new member
const addMember = async (req, res) => {
    try {
        const { name, relation, customId } = req.body;
        if (!name || !relation) return res.status(400).json({ message: "Name & Relation are required" });

        const member = new Member({
            user: req.user._id,
            name,
            relation,
            customId: customId || null
        });

        await member.save();
        res.status(201).json(member);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding member" });
    }
};

// Get all members of logged-in user
const getMembers = async (req, res) => {
    try {
        const members = await Member.find({ user: req.user._id });
        res.json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching members" });
    }
};

// Edit member
const editMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, relation, customId } = req.body;

        const member = await Member.findOne({ _id: id, user: req.user._id });
        if (!member) return res.status(404).json({ message: "Member not found" });

        member.name = name || member.name;
        member.relation = relation || member.relation;
        member.customId = customId !== undefined ? customId : member.customId;

        await member.save();
        res.json(member);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating member" });
    }
};

// Delete member
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findOneAndDelete({ _id: id, user: req.user._id });
        if (!member) return res.status(404).json({ message: "Member not found" });

        res.json({ message: "Member deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting member" });
    }
};

module.exports = { addMember, getMembers, editMember, deleteMember };
