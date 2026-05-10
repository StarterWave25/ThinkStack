const Problem = require("../models/problem.model");
const mongoose = require("mongoose");

const getProblemById = async (problemId) => {
    const problem = await Problem.findById(
        new mongoose.Types.ObjectId(problemId),
    );
    return problem;
};

module.exports = getProblemById;
