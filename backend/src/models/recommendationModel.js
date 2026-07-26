const db = require("../config/db");

const getRecommendedCommunities = async (userId) => {

    const result = await db.query(
        `
        SELECT DISTINCT
            c.community_id,
            c.name,
            c.description
        FROM interactions i
        JOIN posts p
            ON i.target_type = 'Post'
            AND i.target_id = p.post_id
        JOIN communities c
            ON p.community_id = c.community_id
        WHERE i.user_id = $1
        AND c.community_id NOT IN (
            SELECT community_id
            FROM memberships
            WHERE user_id = $1
        );
        `,
        [userId]
    );

    return result.rows;
};

module.exports = {
    getRecommendedCommunities
};