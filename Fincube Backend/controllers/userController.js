const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const { sendToken } = require("../utils/sendToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary");
const videoModel = require("../models/videoModel");

// AUTHENTICATION ROUTES
// Register User 
exports.registerUser = catchAsyncError(async (req, res, next) => {
    console.log("hello")
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password
    });
    sendToken(user, 201, res);
});
//verifyToken
exports.verifyToken = catchAsyncError(async (req, res, next) => {

    try {
        return res.status(200).json({
            success: true,
            message: "Token is valid"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Token is invalid"
        })
    }
}
);

// User Login 
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("Please enter email and password", 400));
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Invalid email or password", 401));
    console.log(user)
    sendToken(user, 200, res);
});

// Logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('fincubeToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
});

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler("User not found", 404));
    //get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    console.log(process.env.FRONTEND_URL);
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    console.log(resetPasswordUrl);
    const message = `Your reset Pasword token for  TECHNO-POWER Personal account is : \n\n${resetPasswordUrl}\nIf you have not requested this email then , please ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: `MyShop Password Recovery`,
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("password dont match with confirm password", 400));
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    sendToken(user, 200, res);
})

// USER PERSONAL ROUTES
// Get User Detail
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// Update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched)
        return next(new ErrorHandler("Old password is incorrect", 401));
    if (req.body.newPassword !== req.body.confirmPassword)
        return next(new ErrorHandler("password dont match with confirm password", 401));
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

//update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    //cloudinary
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    })
})

// uploading videos
exports.uploadVideos = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const { title, description, video } = req.body;
    const result = await cloudinary.uploader.upload(video, {
        resource_type: 'video',
    });
    const newVideo = await videoModel.create({
        title,
        description,
        video: {
            public_id: result.public_id,
            url: result.secure_url,
        },
        userId: req.user.id,
    })
    user.videos.push(result._id)
    await user.save();
    return res.status(201).json({
        success: true,
        message: "Video uploaded successfully",
    })
})

// all videos
exports.getAllVideos = catchAsyncError(async (req, res, next) => {
    const videos = await videoModel.find().populate("userId", "name email")
    res.status(200).json({
        success: true,
        videos
    })
})

// ADMIN ROTUES
// Get all users (admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})


// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler(`User doesn't exist with Id: ${req.body.id}`));
    res.status(200).json({
        success: true,
        user
    })
})

// Update role of users
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    })
})

// Delete user --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    //we  remove cloudinary
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    if (!user) return next(new ErrorHandler(`User doesn't exist with Id : ${req.params.id}`));
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})