const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { fincubeToken } = req.cookies;
    if (!token && !fincubeToken) return next(new ErrorHandler("Please login first", 401));
    const decodedData = jwt.verify(fincubeToken || token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizeRole = () => {
    return (req, res, next) => {
        if (req.user.role === "user") {
            return next(new ErrorHandler("Role : User is not allowed to access this", 400));
        }
        next();
    }
}