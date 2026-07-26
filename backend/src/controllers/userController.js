const {
    getUserProfile
} = require("../models/userModel");

const getMyProfile = async (req, res) => {

    try {

        const profile = await getUserProfile(
            req.user.user_id
        );

        res.json({
            success: true,
            profile
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
    getMyProfile
};