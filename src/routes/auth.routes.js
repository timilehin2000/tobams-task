const express = require("express");
const {
    validateRegisterUserPayload,
    validateLoginUserPayload,
} = require("../helpers/auth.validations");
const { registerUser, loginUser } = require("../controllers/auth.cntroller");

const authRouter = express.Router();

authRouter.post("/register", validateRegisterUserPayload, registerUser);
authRouter.post("/login", validateLoginUserPayload, loginUser);

module.exports = authRouter;
