const db = require("../config/db");

// Create a new user
const createUser = async (
    username,
    email,
    passwordHash
) => {

    const query = `
        INSERT INTO users
        (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING user_id, username, email, created_at;
    `;

    const values = [
        username,
        email,
        passwordHash
    ];

    const result = await db.query(query, values);

    return result.rows[0];

};

// Find user by email
const findUserByEmail = async (email) => {

    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];

};

// Get logged-in user's complete profile
const getUserProfile = async (userId) => {

    // User information
    const userResult = await db.query(
        `SELECT
            user_id,
            username,
            email,
            created_at
        FROM users
        WHERE user_id = $1`,
        [userId]
    );

    // User's posts
    const postsResult = await db.query(
        `SELECT
            post_id,
            title,
            body,
            created_at
        FROM posts
        WHERE user_id = $1
        ORDER BY created_at DESC`,
        [userId]
    );

    // User's comments
    const commentsResult = await db.query(
        `SELECT
            comment_id,
            body,
            post_id,
            created_at
        FROM comments
        WHERE user_id = $1
        ORDER BY created_at DESC`,
        [userId]
    );

    // Communities the user joined
    const communitiesResult = await db.query(
        `SELECT
            communities.community_id,
            communities.name,
            communities.description
        FROM memberships
        JOIN communities
            ON memberships.community_id = communities.community_id
        WHERE memberships.user_id = $1`,
        [userId]
    );

    return {
        user: userResult.rows[0],
        posts: postsResult.rows,
        comments: commentsResult.rows,
        communities: communitiesResult.rows
    };

};

module.exports = {
    createUser,
    findUserByEmail,
    getUserProfile
};