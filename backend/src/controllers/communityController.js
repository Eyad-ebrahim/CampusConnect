const {
    getAllCommunities,
    createCommunity,
    checkMembership,
    joinCommunity,
    leaveCommunity
} = require("../models/communityModel");

const getCommunities = async (req, res) => {
    try {
        const communities = await getAllCommunities();

        res.status(200).json({
            success: true,
            communities
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

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
const joinCommunityController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { communityId } = req.params;

        // Check if already joined
        const existingMembership = await checkMembership(userId, communityId);

        if (existingMembership) {
            return res.status(400).json({
                success: false,
                message: "You are already a member of this community."
            });
        }

        const membership = await joinCommunity(userId, communityId);

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
const leaveCommunityController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { communityId } = req.params;

        const membership = await leaveCommunity(userId, communityId);

        if (!membership) {
            return res.status(404).json({
                success: false,
                message: "You are not a member of this community."
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
    joinCommunityController,
    leaveCommunityController
};