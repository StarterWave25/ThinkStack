const addProblemStatus = (problems, drafts, submissions) => {
    const userDrafts = new Set(
        drafts.map((draft) => draft.problemId.toString()),
    );
    const userSubmissions = new Set(
        submissions.map((submission) => submission.problemId.toString()),
    );
    const taggedProblems = problems.map((problem) => {
        problem = problem.toObject();
        if (userSubmissions.has(problem._id.toString()))
            problem.status = "SOLVED";
        else if (userDrafts.has(problem._id.toString()))
            problem.status = "IN_PROGRESS";
        else problem.status = "NEW";
        return problem;
    });
    return taggedProblems;
};
module.exports = addProblemStatus;
