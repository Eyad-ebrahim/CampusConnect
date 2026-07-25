const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
    register,
    login
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed successfully!",
        user: req.user
    });
});
module.exports = router;