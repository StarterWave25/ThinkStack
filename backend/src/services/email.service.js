const transporter = require("../config/mail");
const sendEmail = async (email, token) => {
    await transporter.sendMail({
        from: `"ThinkStack" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Password",
        html: `<a href="http://localhost:5173/reset-password/${token}">Reset Password</a>`,
    });
};
module.exports = sendEmail;
