const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true },
    referenceSolution: { type: String, required: true },
    isActive: { type: Boolean, required: true },
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
