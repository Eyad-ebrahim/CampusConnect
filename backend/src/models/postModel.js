const db = require("../config/db");

// Get posts by community
const getPostsByCommunity = async (communityId) => {
    const result = await db.query(
        `SELECT
            posts.post_id,
            posts.title,
            posts.body,
            posts.created_at,
            users.username,
            communities.name AS community_name
        FROM posts
        JOIN users
            ON posts.user_id = users.user_id
        JOIN communities
            ON posts.community_id = communities.community_id
        WHERE posts.community_id = $1
        ORDER BY posts.created_at DESC`,
        [communityId]
    );

    return result.rows;
};

// Get single post
const getPostById = async (postId) => {
    const result = await db.query(
        `SELECT
            posts.post_id,
            posts.title,
            posts.body,
            posts.created_at,
            users.username,
            communities.name AS community_name
        FROM posts
        JOIN users
            ON posts.user_id = users.user_id
        JOIN communities
            ON posts.community_id = communities.community_id
        WHERE posts.post_id = $1`,
        [postId]
    );

    return result.rows[0];
};

// Create post
const createPost = async (title, body, userId, communityId) => {
    const result = await db.query(
        `INSERT INTO posts (title, body, user_id, community_id)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [title, body, userId, communityId]
    );

    return result.rows[0];
};

// Delete post
const deletePost = async (postId, userId) => {
    const result = await db.query(
        `DELETE FROM posts
         WHERE post_id = $1
         AND user_id = $2
         RETURNING *`,
        [postId, userId]
    );

    return result.rows[0];
};

module.exports = {
    getPostsByCommunity,
    getPostById,
    createPost,
    deletePost
};