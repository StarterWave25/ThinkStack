const express = require('express');
const router = express.Router();
const { getProfile, updatePassword } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/user.middleware');

// Protect these routes with authMiddleware
router.get('/profile', authMiddleware, getProfile);
router.put('/update-password', authMiddleware, updatePassword);

module.exports = router;