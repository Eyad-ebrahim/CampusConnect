const db = require("../config/db");

// Record a user interaction
const recordInteraction = async (
    userId,
    targetType,
    targetId,
    interactionType
) => {

    const result = await db.query(
        `INSERT INTO interactions
        (user_id, target_type, target_id, interaction_type)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            userId,
            targetType,
            targetId,
            interactionType
        ]
    );

    return result.rows[0];

};

module.exports = {
    recordInteraction
};