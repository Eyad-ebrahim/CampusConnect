const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    getSinglePost,
    removePost
} = require("../controllers/postController");

const {
    addComment
} = require("../controllers/commentController");

// Get a single post
router.get(
    "/:postId",
    authenticateToken,
    getSinglePost
);
// Delete a post
router.delete(
    "/:postId",
    authenticateToken,
    removePost
);

// Add a comment to a post
router.post(
    "/:postId/comments",
    authenticateToken,
    addComment
);

module.exports = router;