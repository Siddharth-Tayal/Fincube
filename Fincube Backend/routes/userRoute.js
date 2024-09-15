const express = require("express");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const { loginUser, logout, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser, verifyToken, registerUser, uploadVideos, getAllVideos } = require("../controllers/userController");
const router = express.Router();
// Normal User Routes 
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/verifyToken").get(isAuthenticated, verifyToken);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetail);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route('/uploadVideos').post(isAuthenticated, uploadVideos)
router.route('/videos').get(isAuthenticated, getAllVideos)
// Admin User Routes
router.route("/admin/users").get(isAuthenticated, authorizeRole(), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticated, authorizeRole(), getSingleUser).put(isAuthenticated, authorizeRole(), updateUserRole).delete(isAuthenticated, authorizeRole(), deleteUser);

module.exports = router;