const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token format."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store user info in request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = authenticateToken;