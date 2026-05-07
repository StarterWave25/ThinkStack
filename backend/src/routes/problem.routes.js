const express = require("express");
const { getAllProblems } = require("../controllers/problem.controller");

const router = express.Router();

router.get("/", getAllProblems);

module.exports = router;
