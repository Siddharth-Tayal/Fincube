const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 5 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false,
        minLength: [8, "Required minimum 8 characters"]
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

// PASSWORD HASHING AND COMPARING
//Password hashing and saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next();
    this.password = await bcrypt.hash(this.password, 10);
})
//Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Genarating JWT token
// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}
//Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generating
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);