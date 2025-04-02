const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/users.js");
const passport = require("passport");
const flash = require("connect-flash");
const {saveRedirectUrl} = require("../middleware.js");
const userControllers = require("../Controllers/user.js");


// router.route("common_path") -> it commbine the res having same request path
router
.route("/signup")
.get(userControllers.getSignup)
.post(wrapAsync(userControllers.postSignup));

router
.route("/login")
.get(userControllers.getLogin)
.post(saveRedirectUrl, passport.authenticate("local",{
    failureRedirect : "/login",
    failureFlash : true,
}),userControllers.postLogin);


router.get("/logout",userControllers.getLogout);

module.exports = router;