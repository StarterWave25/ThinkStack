const express = require("express");
const {
    getUserStats,
    getUserHistory,
    getSubmissionById,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/stats", getUserStats);
router.get("/history", getUserHistory);
router.get("/submissions/:submissionId", getSubmissionById);

module.exports = router;
