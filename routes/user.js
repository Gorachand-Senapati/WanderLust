const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const userController = require("../controllers/user.js");
router.get("/signup", userController.signupUserForm);

router.post("/signup", wrapAsync(userController.signupUser));

router.get("/login", userController.loginUserForm);

router.post("/login", passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), 
userController.loginPage);

router.get("/logout", userController.logoutPage);

module.exports = router;