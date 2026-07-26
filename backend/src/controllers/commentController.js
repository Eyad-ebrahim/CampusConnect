const {
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment
} = require("../models/commentModel");
const {
    recordInteraction
} = require("../models/interactionModel");
// Get comments
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await getCommentsByPost(postId);

        res.json({
            success: true,
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

// Add comment
const addComment = async (req, res) => {
    try {
        const { body } = req.body;
        const { postId } = req.params;

        const comment = await createComment(
            body,
            req.user.user_id,
            postId
        );
await recordInteraction(
    req.user.user_id,
    "Post",
    postId,
    "Commented"
);
        res.status(201).json({
            success: true,
            message: "Comment added successfully.",
            comment
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

// Edit comment
const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { body } = req.body;

        const comment = await updateComment(
            commentId,
            body,
            req.user.user_id
        );

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found or unauthorized."
            });
        }

        res.json({
            success: true,
            message: "Comment updated successfully.",
            comment
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

// Delete comment
const removeComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await deleteComment(
            commentId,
            req.user.user_id
        );

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found or unauthorized."
            });
        }

        res.json({
            success: true,
            message: "Comment deleted successfully."
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
    getComments,
    addComment,
    editComment,
    removeComment
};