const db = require("../config/db");

// Get all communities
const getAllCommunities = async () => {
    const result = await db.query(
        "SELECT * FROM communities ORDER BY community_id"
    );

    return result.rows;
};

// Create a new community
const createCommunity = async (name, description) => {
    const result = await db.query(
        `INSERT INTO communities (name, description)
         VALUES ($1, $2)
         RETURNING *`,
        [name, description]
    );

    return result.rows[0];
};
// Check if user is already a member
const checkMembership = async (userId, communityId) => {
    const result = await db.query(
        `SELECT * FROM memberships
         WHERE user_id = $1 AND community_id = $2`,
        [userId, communityId]
    );

    return result.rows[0];
};
// Join a community
const joinCommunity = async (userId, communityId) => {
    const result = await db.query(
        `INSERT INTO memberships (user_id, community_id)
         VALUES ($1, $2)
         RETURNING *`,
        [userId, communityId]
    );

    return result.rows[0];
};

const leaveCommunity = async (userId, communityId) => {
    const result = await db.query(
        `DELETE FROM memberships
         WHERE user_id = $1 AND community_id = $2
         RETURNING *`,
        [userId, communityId]
    );

    return result.rows[0];
};

module.exports = {
    getAllCommunities,
    createCommunity,
    checkMembership,
    joinCommunity,
    leaveCommunity
};
  