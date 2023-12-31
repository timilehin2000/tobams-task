const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../helpers/response");
const User = require("../models/user.model");

const loginRequired = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        try {
            const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

            if (!verifiedUser) {
                return sendErrorResponse(
                    res,
                    "Invalid authentication was provided",
                    {},
                    401
                );
            }

            const user = await User.findOne({
                _id: verifiedUser.userId,
            });

            if (!user) return sendErrorResponse(res, "No user found", {}, 404);

            req.user = {
                _id: user._id,
                userName: user.userName
            };

            next();
        } catch (err) {
            return sendErrorResponse(
                res,
                "Invalid authentication token provided",
                {},
                401
            );
        }
    } else {
        return sendErrorResponse(
            res,
            "Access Denied. No authenticaation token was provided",
            {},
            403
        );
    }
};

module.exports = loginRequired;
