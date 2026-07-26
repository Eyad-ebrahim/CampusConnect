const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    getMyProfile
} = require("../controllers/userController");

router.get(
    "/me",
    authenticateToken,
    getMyProfile
);

module.exports = router;