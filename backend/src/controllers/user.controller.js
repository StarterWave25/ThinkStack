const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Fetch Profile (Without sending the password hash)
exports.getProfile = async (req, res) => {
    try {
        // req.user.id comes from the user.middleware.js after JWT verification
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching profile' });
    }
};

// Update Password Function
exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        await user.save();

        res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating password' });
    }
};