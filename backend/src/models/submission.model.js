const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
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
    aiBaseScore: { type: Number, required: true, max: 100 },
    steps: {
        understanding: { type: String, default: "", required: true },
        breakdown: { type: String, default: "", required: true },
        approach: { type: String, default: "", required: true },
        solution: { type: String, default: "", required: true },
        reflection: { type: String, default: "", required: true },
    },
    stepScores: {
        understanding: { type: Number, max: 20 },
        breakdown: { type: Number, max: 20 },
        approach: { type: Number, max: 20 },
        solution: { type: Number, max: 20 },
        reflection: { type: Number, max: 20 },
    },
    hintsUsed: {
        type: Number,
        default: 0,
        max: 3,
        required: true,
    },
    penaltyApplied: {
        type: Number,
        default: 0,
        required: true,
    },
    finalScore: {
        type: Number,
        default: 0,
        required: true,
        max: 100,
    },
    mistakeTags: {
        type: [String],
        default: [],
        required: true,
    },
    thinkingPatterns: {
        type: [String],
        default: [],
        required: true,
    },
    expertComparison: {
        expertUnderstanding: { type: String, required: true },
        expertReasoningFlow: { type: String, required: true },
    },
    feedback: {
        strengths: { type: String, default: "", required: true },
        weaknesses: { type: String, default: "", required: true },
        howToImprove: { type: String, default: "", required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
