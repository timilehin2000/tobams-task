const User = require("../models/user.model");

const addNewUser = async (data) => {
    return await new User(data).save();
};

const findUserByUsername = async (userName) => {
    return await User.findOne({ userName });
};

module.exports = { addNewUser, findUserByUsername };
