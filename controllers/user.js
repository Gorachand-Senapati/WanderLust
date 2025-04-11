const User = require("../models/user");

//sign up form
module.exports.signupUserForm = (req, res) => {
    res.render("users/signup.ejs");
};
// signup route
module.exports.signupUser = async(req,res) =>{
   try {
    let{username, email, password} = req.body;//(extract from signup form)
    const newUser = new User({email , username});
   const registeredUser= await User.register(newUser, password);
   console.log(registeredUser);
   req.login(registeredUser, (err) => {
    if(err) {
        return next(err);
    }
    req.flash("success", "Welcome to wander Lust!");
   res.redirect("/listings");
   })
//    req.flash("success", "Welcome to wander Lust!");
//    res.redirect("/listings");
   } catch(e) {
       req.flash("error", e.message);
       res.redirect("/signup");
   }
}

//login form
module.exports.loginUserForm = (req, res) => {
    res.render("users/login.ejs");
}
//login route
module.exports.loginPage = async(req,res) => {
    // passport.authenticate()--- check kore databse ache kina
    req.flash("success", "Welcome to your page! "); 
    res.redirect("/listings");

}
//logout page
module.exports.logoutPage = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        };
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
}