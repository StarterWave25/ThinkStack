const express = require("express");
const {
    getSubmissionById,
    getUserDashboard,
    updateProfilePic,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.get("/dashboard", getUserDashboard);
router.get("/submissions/:submissionId", getSubmissionById);
router.post("/profile-picture", upload.single("image"), updateProfilePic);

module.exports = router;
