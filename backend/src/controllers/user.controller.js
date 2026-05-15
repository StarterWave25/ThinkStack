const mongoose = require("mongoose");
const respond = require("../utils/responseFormat");
const Submission = require("../models/submission.model");
const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");

/**
 * 
 * Controller to calculate user stats and serve to frontend along with the user's submissions history.
 * Calculates the stats based on the submissions done by the user.
 * 
 * Input => No input is required (required userId is extracted from cookies so no need to manually send!)
 * Output => Returns dashboardData: {stats:[
 *      {
            "totalSolved"
            "averageScore"
            "totalHintsUsed"
        },
        submissions:{ 
            [**List of user's problem's submissions.**]
         }
    }
 * ] Note:- stats and submissions are inside data property of the response object inform of array and the stat object is inside the array as first element.
 * 
 */
const getUserDashboard = async (req, res) => {
    try {
        const dashboardData = await Submission.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                },
            },
            {
                $facet: {
                    stats: [
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
                    ],
                    submissions: [
                        {
                            $sort: {
                                createdAt: -1,
                            },
                        },
                    ],
                },
            },
        ]);
        return respond(res, true, 200, dashboardData, {});
    } catch (error) {
        console.log("\n\n😱 Error fetching user stats!:", error);
        return respond(res, false, 500, "Error fetching user stats!", {});
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

const updateProfilePic = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return respond(res, false, 404, "User doesn't exist!", {});
        if (user.profilePic && user.profilePic !== "default_pfp.jpg") {
            const oldFileName = user.profilePic;
            const oldImagePath = path.join(
                __dirname,
                "../uploads",
                oldFileName,
            );
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        user.profilePic = req.file.filename;
        await user.save();
        const imageURL =
            req.protocol +
            "://" +
            req.get("host") +
            "/src/uploads/" +
            user.profilePic;
        return respond(res, true, 200, { imageURL, user }, {});
    } catch (error) {
        console.log("\n\n😱 Error updating profile Picture!:", error);
        return respond(res, false, 500, "Error updating profile Picture!", {});
    }
};

module.exports = { getUserDashboard, getSubmissionById, updateProfilePic };
