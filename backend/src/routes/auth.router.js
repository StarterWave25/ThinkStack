const express = require("express");
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    getMe,
    logout,
} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", authMiddleware, changePassword);
router.get("/me", getMe);
router.post("/logout", logout);

module.exports = router;
