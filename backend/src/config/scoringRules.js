const SCORING_RULES = {
    HINT_PENALTIES: {
        0: 0, // 0 hints used = 0 points deducted
        1: 10, // 1 hint = -10 points
        2: 25, // 2 hints = -25 points
        3: 40, // 3 hints = -40 points
    },
};
module.exports = SCORING_RULES;
