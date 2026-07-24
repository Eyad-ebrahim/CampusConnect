const pool = require("../config/db");

const createUser = async (
    username,
    email,
    passwordHash
) => {

    const query = `
        INSERT INTO users
        (username,email,password_hash)
        VALUES($1,$2,$3)
        RETURNING user_id,username,email,created_at;
    `;

    const values = [
        username,
        email,
        passwordHash
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

};

module.exports = {
    createUser
};