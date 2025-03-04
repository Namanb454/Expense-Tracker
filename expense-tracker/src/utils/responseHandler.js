const sendSuccessResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data,
        timestamp: new Date().toISOString()
    });
};

const sendErrorResponse = (res, error, statusCode = 500) => {
    console.error(error);
    res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};