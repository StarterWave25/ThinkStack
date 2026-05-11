const express = require("express");
const evaluateProblem = require("../controllers/evaluate.controller");

const router = express.Router();

router.post("/:problemId", evaluateProblem);

module.exports = router;
