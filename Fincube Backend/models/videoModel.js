const mongoose = require("mongoose");


const videoSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 5 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is must"],
    },
    video: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Video", videoSchema);