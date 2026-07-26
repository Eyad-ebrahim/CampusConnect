const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    getComments,
    addComment,
    editComment,
    removeComment
} = require("../controllers/commentController");

router.get("/:postId", getComments);

router.post(
    "/:postId",
    authenticateToken,
    addComment
);

router.put(
    "/:commentId",
    authenticateToken,
    editComment
);

router.delete(
    "/:commentId",
    authenticateToken,
    removeComment
);

module.exports = router;