const mongoose = require("mongoose");
const respond = require("../utils/responseFormat");
const Submission = require("../models/submission.model");

/**
 * 
 * Controller to calculate user stats and serve to frontend.
 * Calculates the stats based on the submissions done by the user.
 * 
 * Input => No input is required (required userId is extracted from cookies so no need to manually send!)
 * Output => Returns stats:[
 *      {
            "totalSolved"
            "averageScore"
            "totalHintsUsed"
        }
 * ] Note:- stats are inside data property of the response object inform of array and the stat object is inside the array as first element.
 * 
 */
const getUserStats = async (req, res) => {
    try {
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
    } catch (error) {
        console.log("\n\n😱 Error fetching user stats!:", error);
        return respond(res, false, 500, "Error fetching user stats!", {});
    }
};

/**
 *
 * Controller that returns user's history of submissions.
 * Returns a list of objects which are essentially the Submission schema objects.
 * Refer submission schema for more details on the properties returned in response.
 */
const getUserHistory = async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user.id });
        if (!submissions)
            return respond(
                res,
                true,
                200,
                "No submissions by current user!",
                {},
            );
        return respond(res, true, 200, submissions, {});
    } catch (error) {
        console.log("\n\n😱 Error fetching User History!:", error);
        return respond(res, false, 500, "Error fetching User History!", {});
    }
};

/**
 *
 * Controller that returns user's single submission which is requested with specific submission Id
 * Returns submission that matches the Id sent.
 * Refer submission schema for more details on the properties returned in response.
 *
 * Input: { submissionId } => req.params;
 *
 */
const getSubmissionById = async (req, res) => {
    try {
        if (!req.params.submissionId)
            return respond(res, false, 400, "Submission id is required!", {});
        const submission = await Submission.findOne({
            _id: req.params.submissionId,
            userId: req.user.id,
        });
        if (!submission)
            return respond(res, false, 400, "No such submission!", {});
        return respond(res, true, 200, submission, {});
    } catch (error) {
        console.log("\n\n😱 Error fetching Submission!:", error);
        return respond(res, false, 500, "Error fetching Submission!", {});
    }
};

module.exports = { getUserStats, getUserHistory, getSubmissionById };
