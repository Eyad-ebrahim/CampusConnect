const {
    getAllCommunities,
    createCommunity,
    checkMembership,
    joinCommunity,
    leaveCommunity,
} = require("../models/communityModel");
const {
    recordInteraction
} = require("../models/interactionModel");
const {
    getPostsByCommunity,
    createPost
} = require("../models/postModel");

// Get all communities
const getCommunities = async (req, res) => {
    try {

        const communities = await getAllCommunities();

        res.json({
            success: true,
            communities
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

// Create community
const addCommunity = async (req, res) => {
    try {

        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        const community = await createCommunity(name, description);

        res.status(201).json({
            success: true,
            message: "Community created successfully.",
            community
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

// Get posts of a community
const getCommunityPosts = async (req, res) => {
    try {

        const { communityId } = req.params;

        const posts = await getPostsByCommunity(communityId);

        res.json({
            success: true,
            posts
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

// Create post in community
const addCommunityPost = async (req, res) => {
    try {

        const { title, body } = req.body;
        const { communityId } = req.params;

        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "Please provide title and body."
            });
        }

        const post = await createPost(
            title,
            body,
            req.user.user_id,
            communityId
        );
await recordInteraction(
    req.user.user_id,
    "Post",
    post.post_id,
    "Posted"
);
        res.status(201).json({
            success: true,
            message: "Post created successfully.",
            post
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

// Join community
const joinCommunityController = async (req, res) => {
    try {

        const userId = req.user.user_id;
        const { communityId } = req.params;

        const existingMembership = await checkMembership(
            userId,
            communityId
        );

        if (existingMembership) {
            return res.status(400).json({
                success: false,
                message: "You are already a member."
            });
        }

        const membership = await joinCommunity(
            userId,
            communityId
        );

        // Record interaction
        await recordInteraction(
            userId,
            "Community",
            communityId,
            "Joined"
        );

        res.status(201).json({
            success: true,
            message: "Joined community successfully.",
            membership
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

// Leave community
const leaveCommunityController = async (req, res) => {
    try {

        const { communityId } = req.params;

        const membership = await leaveCommunity(
            req.user.user_id,
            communityId
        );
        if (!membership) {
            return res.status(404).json({
                success: false,
                message: "You are not a member."
            });
        }

        res.json({
            success: true,
            message: "Left community successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

module.exports = {
    getCommunities,
    addCommunity,
    getCommunityPosts,
    addCommunityPost,
    joinCommunityController,
    leaveCommunityController
};