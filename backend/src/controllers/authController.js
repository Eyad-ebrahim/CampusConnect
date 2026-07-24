const bcrypt = require("bcrypt");
const { createUser } = require("../models/userModel");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(
            username,
            email,
            hashedPassword
        );

        res.status(201).json({
            message: "User created successfully.",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

module.exports = { register };