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
        if (difficulty && !["Easy", "Medium", "Hard"].includes(difficulty))
            return respond(res, false, 400, "Invalid difficulty!", {});

        const filter = {};
        if (difficulty) filter.difficulty = difficulty;

        const problems = await Problem.find(
            filter,
            "title description difficulty",
        );

        return respond(res, true, 200, problems, {});
    } catch (error) {
        console.log("\n\n😱 Error fetching problems:", error);
        return respond(res, false, 500, "Error fetching problems", {});
    }
};

/**
 *
 * Controller to handle getting a single problem request.
 * Fetches a single problem with given id from db and returns it in response.
 *
 * Input => { id } =>req.params (route params), (id refers to the problem id that is to be fetched.)
 * Output => Returns a problem data with given id fetched from the db.
 *
 */
const getProblem = async (req, res) => {
    try {
        const problemId = req.params.id;
        if (!problemId)
            return respond(res, false, 400, "Problem Id is required!", {});
        const problem = await Problem.findById(problemId);
        if (!problem)
            return respond(
                res,
                false,
                404,
                "Problem with the requested id doesn't exists!",
                {},
            );
        return respond(res, true, 200, problem, {});
    } catch (error) {
        console.log("\n\n😱 Error fetching problems:", error);
        return respond(res, false, 500, "Error fetching problem", {});
    }
};

module.exports = { getAllProblems, getProblem };
