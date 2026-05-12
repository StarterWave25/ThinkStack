const mongoose = require("mongoose");
const respond = require("../utils/responseFormat");
const Submission = require("../models/submission.model");

const getUserStats = async (req, res) => {
    const stats = await Submission.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(req.user.id),
            },
        },
        {
            $group: {
                _id: null,
                totalSolved: {
                    $sum: 1,
                },
                averageScore: {
                    $avg: "$finalScore",
                },
                totalHintsUsed: {
                    $sum: "$hintsUsed",
                },
            },
        },
    ]);
    return respond(res, true, 200, stats, {});
};
const getUserHistory = async (req, res) => {
    const submissions = await Submission.find({ userId: req.user.id });
    if (!submissions)
        return respond(res, true, 200, "No submissions by current user!", {});
    return respond(res, true, 200, submissions, {});
};
const getSubmissionById = async (req, res) => {
    if (!req.params.submissionId)
        return respond(res, false, 400, "Submission id is required!", {});
    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) return respond(res, false, 400, "No such submission!", {});
    return respond(res, true, 200, submission, {});
};

module.exports = { getUserStats, getUserHistory, getSubmissionById };
