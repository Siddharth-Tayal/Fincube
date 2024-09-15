const express = require('express')
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDB = require("./config/database")
const cors = require('cors')
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const user = require("./routes/userRoute");

process.on("uncaughtException", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shuting down the server due to Uncaught Exception.`);
    process.exit(1);
});

// config
dotenv.config();
//cloudinary connection
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

//connecting to databse
connectDB();

// middlewares 
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

//Route imports

// Routes implementation
app.use("/api/v1/user", user);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shuting down the server due to Unhandled Promise Rejection.`);
    server.close(() => {
        process.exit(1);
    });
});