const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
    getCommunities,
    addCommunity,
    joinCommunityController,
    leaveCommunityController
} = require("../controllers/communityController");
router.get("/", getCommunities);
router.post("/", authenticateToken, addCommunity);
router.post("/:communityId/join", authenticateToken, joinCommunityController);
router.delete(
    "/:communityId/leave",
    authenticateToken,
    leaveCommunityController
);
module.exports = router;