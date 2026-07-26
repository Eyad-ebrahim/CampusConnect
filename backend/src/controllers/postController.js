const {
    getPostById,
    createPost,
    deletePost
} = require("../models/postModel");

const {
    recordInteraction
} = require("../models/interactionModel");

const {
    getCommentsByPost
} = require("../models/commentModel");

// Get single post with comments
const getSinglePost = async (req, res) => {
    try {

        const { postId } = req.params;

        const post = await getPostById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found."
            });
        }
// Record post view if the user is authenticated
if (req.user) {
    await recordInteraction(
        req.user.user_id,
        "Post",
        postId,
        "Viewed"
    );
}
        const comments = await getCommentsByPost(postId);

        res.json({
            success: true,
            post,
            comments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

// Create post inside a community
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

// Delete post
const removePost = async (req, res) => {
    try {

        const { postId } = req.params;

        const post = await deletePost(
            postId,
            req.user.user_id
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found or unauthorized."
            });
        }

        res.json({
            success: true,
            message: "Post deleted successfully."
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
    getSinglePost,
    addCommunityPost,
    removePost
};