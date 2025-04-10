const User = require("../models/users.js");

module.exports.getSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.postSignup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.login(registeredUser , (err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wounderlust !");
            res.redirect("/listings");
        })
       } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.getLogin = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.postLogin = async(req,res) => {
    req.flash("success","Welcome to Wounderlust ! You are login.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.getLogout = (req,res,next)=>{
    req.logout((err) =>{
     if(err){
        next(err);
     };
     req.flash("success","You are logged out !");
     res.redirect("/listings");
    });
};