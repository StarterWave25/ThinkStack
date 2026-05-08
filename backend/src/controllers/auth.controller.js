const respond = require("../lib/responseFormat");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../services/email.service");

const saltRounds = 10;

async function hashPassword(password) {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return respond(res, false, 400, "All fields are required", {});
        }

        const isAlreadyUser = await User.findOne({ email });
        if (isAlreadyUser) {
            return respond(res, false, 400, "User already exists", {});
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const jwtToken = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );
        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return respond(
            res,
            true,
            201,
            {
                message: "User Account Created Successfully!",
            },
            {},
        );
    } catch (error) {
        console.log("\n\n😱 Error saving new user:", error);
        return respond(res, false, 500, "Error Saving User", {});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return respond(res, false, 400, "Invalid credentials", {});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return respond(res, false, 400, "Invalid credentials", {});
        }

        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return respond(
            res,
            true,
            200,
            {
                message: "Login successful",
            },
            {},
        );
    } catch (error) {
        console.log("\n\n😱 Error during login:", error);
        return respond(res, false, 500, "Login failed", {});
    }
};

/**
 *
 * Controller function to handle forgot password request.
 * Sends a mail to the user to their mail Id to reset password with a token
 *
 * Input=> { email } => req.body
 * Output=> responds with a message that user will get a reset link in their registered mail
 *
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return respond(res, false, 400, "User doesn't exist!", {});
        }
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(crypto.randomBytes(32).toString("hex"))
            .digest("hex");
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();
        sendEmail(email, user.resetPasswordToken);
        return respond(
            res,
            true,
            200,
            "If your email is registered, you will receive a reset link shortly.",
            {},
        );
    } catch (error) {
        console.log("\n\n😱 Error during Forgotting Password:", error);
        return respond(res, false, 500, "Forgot Password failed", {});
    }
};

/**
 * Controller function to handle reset password request
 * Changes the password to a new password sent by the user
 *
 * Input=> { password } => req.body ("password" is the new password to be changed to),
 *  => { token } => req.params (acquired automatically in frontend after user clicks the reset link in their mail)
 *
 * Output=> responds with a success message of password changed successfully.
 *
 */
const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        console.log(req.params.token);
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        console.log(user);
        if (!user)
            return respond(res, false, 400, "Invalid or expired Token!", {});
        user.password = await hashPassword(password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return respond(res, true, 200, "Password updated succesfully!");
    } catch (error) {
        console.log("\n\n😱 Error during Resetting Password:", error);
        return respond(res, false, 500, "Reset Password failed", {});
    }
};

/**
 *
 * Controller to handle changing of password by the user when logged in
 * changes the password to a new one sent by the frontend
 * After changing password to a new one, it deletes the cookie that is on the frontend.
 *
 * Input=> { password } => req.body ("password" is the new password to be changed to)
 * Output=> responds with a success message that password changed successfully! and tells to login again with new credentials!
 *
 */
const changePassword = async (req, res) => {
    try {
        const password = req.body.password;
        if (!password) return respond(res, false, 400, "Password is required!");
        const user = await User.findById(req.user.id);
        user.password = await hashPassword(password);
        await user.save();
        res.clearCookie("jwtToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return respond(
            res,
            true,
            200,
            "Password changed successfully! Please login again!",
        );
    } catch (error) {
        console.log("\n\n😱 Error during Changing Password:", error);
        return respond(res, false, 500, "Change Password failed", {});
    }
};

/**
 * Controller to handle current user details knowing
 * Gives current user email if logged in else gives a not logged in message
 *
 * Input => { jwtToken } => res.cookie (this cookie is automatically sent by the browser if written header credentials:include in the request )
 * output => If no token returns a 400 response with User not logged in message
 *  => If token is there, extracts the user from the token, takes the email from the it and sends it as payload to the frontend.
 *
 */
const getMe = async (req, res) => {
    try {
        if (!req.cookies || !req.cookies.jwtToken) {
            return respond(res, false, 400, "User not logged in!", {});
        }
        const user = jwt.verify(req.cookies.jwtToken, process.env.JWT_SECRET);
        return respond(res, true, 200, { email: user.email }, {});
    } catch (error) {
        console.log("\n\n😱 Error during Getting me:", error);
        return respond(res, false, 500, "Get me failed", {});
    }
};

/**
 *
 * controller to handle user logout
 * Logs out the user by clearing the cookie that is stored in the frontend which contains the jwtToken
 *
 * Input => { jwtToken } => res.cookie (this cookie is automatically sent by the browser if written header credentials:include in the request )
 * Output => If no token returns 200 response with no data
 *  => If token is there, clears the cookie and sends logout successful message with 200 response.
 */
const logout = async (req, res) => {
    try {
        if (!req.cookies || !req.cookies.jwtToken) {
            return respond(res, true, 200, "", {});
        }
        res.clearCookie("jwtToken");
        return respond(res, true, 200, "Logged out successfully!", {});
    } catch (error) {
        console.log("\n\n😱 Error during logging out:", error);
        return respond(res, false, 500, "Logout failed", {});
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    getMe,
    logout,
};
