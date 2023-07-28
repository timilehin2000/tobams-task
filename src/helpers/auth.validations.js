const joi = require("joi");
const { handleValidationError } = require("./response");

const validateRegisterUserPayload = (req, res, next) => {
    const schema = joi.object({
        userName: joi.string().required(),
        password: joi
            .string()
            .min(8)
            .pattern(
                new RegExp(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                )
            )
            .required()
            .messages({
                "string.pattern.base":
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character:",
                "string.min": "Password must be at least 8 characters long",
            }),
    });

    const { error } = schema.validate(req.body, { allowUnknown: false });

    if (error) {
        return handleValidationError(error, res);
    }

    next();
};

const validateLoginUserPayload = (req, res, next) => {
    const schema = joi.object({
        userName: joi.string().required(),
        password: joi.string().required(),
    });

    const { error } = schema.validate(req.body, { allowUnknown: false });

    if (error) {
        return handleValidationError(error, res);
    }

    next();
};

module.exports = { validateRegisterUserPayload, validateLoginUserPayload };
