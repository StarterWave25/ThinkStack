const respond = require("../lib/responseFormat");
const Draft = require("../models/draft.model");
const mongoose = require("mongoose");
/**
 *
 * Controller to return a draft requested by the user.
 * Fetches a draft if present in the db with the given problemId and userId and returns it in response.
 *
 * Input => { problemId } => req.params
 * Output => Returns the stored draft for that user for the specific problem if user has attempted and saved the problem in middle. Or else returns empty response which signifies that user hasn't attempted this specific problem yet.
 *
 */
const getDraft = async (req, res) => {
    try {
        if (!req.params.problemId)
            return respond(res, false, 400, "Problem Id is required!", {});
        if (!mongoose.Types.ObjectId.isValid(req.params.problemId))
            return respond(res, false, 400, "Invalid problemId Type!", {});
        const problem = await Draft.findOne({
            userId: req.user.id,
            problemId: req.params.problemId,
        });
        if (!problem) return respond(res, true, 200, {}, {});
        return respond(res, true, 200, problem, {});
    } catch (error) {
        console.log("\n\n😱 Error fetching Draft:", error);
        return respond(res, false, 500, "Error fetching Draft", {});
    }
};

/**
 *
 * Controller to handle saving draft request.
 * Updates an existing draft with new status if present or creates a new draft if not present.
 *
 * Input => { problemId, currentStep, value } => req.body
 *  Note => currentStep refers to the step that the user is currently finished submitting/ writing the answer.
 *  => value is the string form of the answer the user filled in the form in frontend.
 * -> This route automatically creates a draft document if it doesn't exist in the first place in the db!
 *
 */
const saveDraft = async (req, res) => {
    try {
        if (!req.body.problemId)
            return respond(res, false, 400, "Problem Id is required!", {});
        if (!mongoose.Types.ObjectId.isValid(req.body.problemId))
            return respond(res, false, 400, "Invalid problemId Type!", {});
        if (!req.body.currentStep)
            return respond(
                res,
                false,
                400,
                "Current step of the user is required for saving the draft!",
            );
        if (!req.body.value)
            return respond(
                res,
                false,
                400,
                "Value for the Current step is required for saving the draft!",
            );
        const validSteps = [
            "understanding",
            "breakdown",
            "approach",
            "solution",
            "reflection",
        ];
        if (!validSteps.includes(req.body.currentStep))
            return respond(res, false, 400, "Invalid current step!", {});

        const updateData = {
            [`steps.${req.body.currentStep}`]: req.body.value,
            currentStep: req.body.currentStep,
        };
        const draft = await Draft.findOneAndUpdate(
            {
                problemId: req.body.problemId,
                userId: req.user.id,
            },
            {
                $set: updateData,
            },
            {
                returnDocument: "after",
                upsert: true,
            },
        );
        return respond(res, true, 200, draft, {});
    } catch (error) {
        console.log("\n\n😱 Error Saving draft!:", error);
        return respond(res, false, 500, "Error Saving draft!", {});
    }
};

module.exports = { getDraft, saveDraft };
