const express = require("express");
const {
    getSubmissionById,
    getUserDashboard,
    updateProfilePic,
    updateProfile,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.get("/dashboard", getUserDashboard);
router.get("/submissions/:submissionId", getSubmissionById);
router.put("/profile-picture", upload.single("profilePhoto"), updateProfilePic);
router.put("/update-profile", updateProfile);

module.exports = router;
