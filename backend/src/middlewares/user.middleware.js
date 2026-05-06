const jwt = require("jsonwebtoken");
const respond = require("../lib/responseFormat");
const authMiddleware = (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies || !cookies.jwtToken) {
            return respond(res, false, 401, "No token provided", {});
        }

        const decoded = jwt.verify(cookies.jwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return respond(res, false, 401, "Invalid token", {});
    }
};
module.exports = { authMiddleware };
