const makeResponse = (status, message, data) => {
    if (status) {
        return {
            status,
            message: message,
            data: data,
        };
    }
    return {
        status,
        message: message,
        data: data,
    };
};

const sendSuccessResponse = (res, message, data, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data: data,
    });
};

const sendErrorResponse = (res, message, data, statusCode = 400) => {
    return res.status(statusCode).json({
        status: false,
        message,
        data: data,
    });
};

const handleValidationError = (validateErrorData, res) => {
    const message = validateErrorData.details[0].message;
    return sendErrorResponse(res, message, {}, 400);
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
    handleValidationError,
    makeResponse,
};
