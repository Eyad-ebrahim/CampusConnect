const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    getCommunities,
    addCommunity,
    getCommunityPosts,
    addCommunityPost,
    joinCommunityController,
    leaveCommunityController
} = require("../controllers/communityController");

// Communities
router.get("/", getCommunities);

router.post(
    "/",
    authenticateToken,
    addCommunity
);

// Required by assignment
router.get("/:communityId/posts", getCommunityPosts);

router.post(
    "/:communityId/posts",
    authenticateToken,
    addCommunityPost
);

// Join
router.post(
    "/:communityId/join",
    authenticateToken,
    joinCommunityController
);

// Leave
router.delete(
    "/:communityId/leave",
    authenticateToken,
    leaveCommunityController
);

module.exports = router;