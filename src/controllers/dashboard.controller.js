const { sendSuccessResponse } = require("../helpers/response");
const { capitalizeFirstLetter } = require("../helpers/utils");

const dashboard = (req, res) => {
    const { userName } = req.user;

    return res.json({
        data: `Welcome to your dashboard ${capitalizeFirstLetter(userName)}`,
    });
};

module.exports = { dashboard };
