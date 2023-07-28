const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../helpers/response");
const { generateToken } = require("../helpers/utils");
const User = require("../models/user.model");
const { findUserByUsername, addNewUser } = require("../services/user.service");

const registerUser = async (req, res) => {
    const { userName, password } = req.body;
    console.log({ userName });

    try {
        const user = await findUserByUsername(userName);
        if (user) {
            return sendErrorResponse(
                res,
                "Username already exist. Please try another username",
                {},
                404
            );
        }

        const newUser = await addNewUser({ userName, password });

        return sendSuccessResponse(
            res,
            "Successfully added a new user",
            {
                userDetails: newUser,
            },
            201
        );
    } catch (err) {
        console.log(err);
        return sendErrorResponse(
            res,
            `Sorry, an unknown error occured. Error: ${err}`,
            {},
            500
        );
    }
};

const loginUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await findUserByUsername(userName);
        if (!user) {
            return sendErrorResponse(res, "Invalid login details", {}, 400);
        }

        const validatePassword = await user.comparePassword(password);
        if (!validatePassword) {
            return sendErrorResponse(res, "Invalid login details.", {}, 400);
        }

        const token = await generateToken(user._id);

        return sendSuccessResponse(
            res,
            "Successfully logged in",
            { userDetails: { userName, token } },
            200
        );
    } catch (err) {
        console.log(err);
        return sendErrorResponse(
            res,
            "Sorry, an unknown error occured",
            {},
            500
        );
    }
};

module.exports = { registerUser, loginUser };
