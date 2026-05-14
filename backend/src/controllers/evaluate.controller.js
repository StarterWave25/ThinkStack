const mongoose = require("mongoose");
const getProblemById = require("../utils/getProblemById");
const Draft = require("../models/draft.model");
const respond = require("../utils/responseFormat");
const AIReview = require("../services/ai.service");
const SCORING_RULES = require("../config/scoringRules");
const Submission = require("../models/submission.model");

/**
 *
 * Controller to evaluate the user's 5-step solution and save it as a permanent submission
 * Submits the draft with all the steps of problem solving completed to AI reviewer and gets a score.
 * Applies penalties to the score calculated by the AI reviewer based on the hints used and store the data as submission in database as a permanent record.
 *
 * Input => { problemId } => req.params
 * Output => Returns the submission object that is newly created with all the details of the problem solved result and review of the AI reviewer.
 *
 */
const evaluateProblem = async (req, res) => {
    try {
        if (!req.params.problemId)
            return respond(res, false, 400, "Problem Id is required!", {});
        if (!mongoose.Types.ObjectId.isValid(req.params.problemId))
            return respond(res, false, 400, "Invalid problemId Type!", {});
        const problem = await getProblemById(req.params.problemId);
        if (!problem)
            return respond(
                res,
                false,
                404,
                "Problem with the requested id doesn't exists!",
                {},
            );
        const draft = await Draft.findOne({
            userId: req.user.id,
            problemId: req.params.problemId,
        });
        if (!draft)
            return respond(
                res,
                false,
                404,
                "No active draft found for the current user and problem to submit!",
                {},
            );
        const validSteps = [
            "understanding",
            "breakdown",
            "approach",
            "solution",
            "reflection",
        ];
        for (let i = 0; i < 3; i++) {
            if (draft.steps[validSteps[i]] === "")
                return respond(
                    res,
                    false,
                    400,
                    "5 steps must be completed to submit!",
                    {},
                );
        }
        const aiResult = await AIReview(draft, problem);
        if (aiResult instanceof Error) throw aiResult;
        const penaltyApplied = SCORING_RULES.HINT_PENALTIES[draft.hintsUsed];
        let finalScore = aiResult.aiBaseScore - penaltyApplied;
        if (finalScore < 0) finalScore = 0;
        const submission = await Submission.create({
            userId: req.user.id,
            problemId: req.params.problemId,
            steps: draft.steps,
            stepScores: aiResult.stepScores,
            aiBaseScore: aiResult.aiBaseScore,
            hintsUsed: draft.hintsUsed,
            penaltyApplied,
            finalScore,
            mistakeTags: aiResult.mistakeTags,
            thinkingPatterns: aiResult.thinkingPatterns,
            expertComparison: aiResult.expertComparison,
            feedback: aiResult.feedback,
        });

        //await Draft.deleteById(draft._id);

        return respond(res, true, 200, submission, {});
    } catch (error) {
        console.log(
            "\n\n😱 Error evaluating and submitting the problem",
            error,
        );
        return respond(
            res,
            false,
            500,
            "Error evaluating and submitting the problem",
            {},
        );
    }
};

module.exports = evaluateProblem;
