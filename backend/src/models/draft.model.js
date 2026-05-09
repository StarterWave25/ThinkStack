const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Problem",
    },
    currentStep: {
        type: String,
        required: true,
    },
    steps: {
        understanding: { type: String, default: "" },
        breakdown: { type: String, default: "" },
        approach: { type: String, default: "" },
        solution: { type: String, default: "" },
        reflection: { type: String, default: "" },
    },
});

const Draft = mongoose.model("Draft", draftSchema);
module.exports = Draft;
