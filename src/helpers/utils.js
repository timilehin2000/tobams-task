const jwt = require("jsonwebtoken");

const generateToken = async (userId) => {
    return jwt.sign(
        {
            userId,
        },
        process.env.JWT_SECRET,
        {
            algorithm: "HS256",

            expiresIn: "1d",
        }
    );
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = { generateToken, capitalizeFirstLetter };
