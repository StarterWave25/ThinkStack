const express = require("express");
const {
    getUserHistory,
    getSubmissionById,
    getUserDashboard,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/dashboard", getUserDashboard);
router.get("/submissions/:submissionId", getSubmissionById);

module.exports = router;
