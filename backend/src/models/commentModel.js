const db = require("../config/db");

// Get comments for a specific post
const getCommentsByPost = async (postId) => {
    const result = await db.query(
        `SELECT
            comments.comment_id,
            comments.body,
            comments.created_at,
            users.username
        FROM comments
        JOIN users
            ON comments.user_id = users.user_id
        WHERE comments.post_id = $1
        ORDER BY comments.created_at ASC`,
        [postId]
    );

    return result.rows;
};

// Create comment
const createComment = async (body, userId, postId) => {
    const result = await db.query(
        `INSERT INTO comments (body, user_id, post_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [body, userId, postId]
    );

    return result.rows[0];
};

// Update comment
const updateComment = async (commentId, body, userId) => {
    const result = await db.query(
        `UPDATE comments
         SET body = $1
         WHERE comment_id = $2
         AND user_id = $3
         RETURNING *`,
        [body, commentId, userId]
    );

    return result.rows[0];
};

// Delete comment
const deleteComment = async (commentId, userId) => {
    const result = await db.query(
        `DELETE FROM comments
         WHERE comment_id = $1
         AND user_id = $2
         RETURNING *`,
        [commentId, userId]
    );

    return result.rows[0];
};

module.exports = {
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment
};