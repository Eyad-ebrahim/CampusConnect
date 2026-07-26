const {
    getRecommendedCommunities
} = require("../models/recommendationModel");

const getRecommendations = async (req, res) => {

    try {

        const userId = req.user.user_id;

        const recommendations =
            await getRecommendedCommunities(userId);

        res.status(200).json({
            success: true,
            recommendations
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
    getRecommendations
};