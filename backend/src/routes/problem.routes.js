const express = require("express");
const {
    getAllProblems,
    getProblem,
} = require("../controllers/problem.controller");

const router = express.Router();

router.get("/", getAllProblems);
router.get("/:id", getProblem);

module.exports = router;
