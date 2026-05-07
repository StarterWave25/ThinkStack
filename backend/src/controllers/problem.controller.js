const respond = require("../lib/responseFormat");
const Problem = require("../models/problem.model");

/**
 *
 * Controller to handle getting all problems request.
 * Returns all the problems from the database if no difficulty level provided in the search params.
 * Filters and returns specific difficulty level problems if difficulty level provided in the search params.
 *
 * Input => case:1 => no input is required for common query
 * => case:2 => { difficulty } => req.query (put in query params)
 * Output => case:1 => Returns all the problems that are stored in the database
 * => case:2 => Filters and Returns the problems that match the difficulty level mentioned in the query params. ( Difficulty level should match one of the perdefined types of levels in the controller only! )
 *
 */
const getAllProblems = async (req, res) => {
    try {
        const difficulty = req.query.difficulty;
        console.log(difficulty);
        if (difficulty && !["Easy", "Medium", "Hard"].includes(difficulty))
            return respond(res, false, 400, "Invalid difficulty!", {});

        const filter = {};
        if (difficulty) filter.difficulty = difficulty;

        const problems = await Problem.find(filter);

        return respond(res, true, 200, problems, {});
    } catch (error) {
        console.log("\n\n😱 Error fetching problems:", error);
        return respond(res, false, 500, "Error fetching problems", {});
    }
};

module.exports = { getAllProblems };
