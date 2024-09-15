const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // MongoDB invalid object id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    };
    // mongoose duplicate err
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400);
    }
    // Wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid , try again `;
        err = new ErrorHandler(message, 400);
    };
    // expire jwt error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, try again `;
        err = new ErrorHandler(message, 400);
    };
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}