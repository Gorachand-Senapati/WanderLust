if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
//now I am in devlopment phase when it deploy it not share in github or another 
// console.log(process.env.SECRET) ;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOveride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utlis/wrapAsync.js");
const ExpressError = require("./utlis/ExpressError.js");
const{listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require ("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLAS_DB_URL;

main().then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log(err);
})
async function main() {
    await mongoose.connect(dbUrl);//MONGO_URL(test)
}

//ejs ke require kora hoche 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOveride("_method"));

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  //kotokhon khola thakbe logout na hoa ubdhi akmatro update korle hobe
  touchAfter: 24*3600,
});

store.on("error", () => {
  console.log("Error in MONGO SESSION STORE",err)
})

const sessionOptions = {
  store,
  //when test then store comment
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true ,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}



app.use(session(sessionOptions));
app.use (flash());

//passport session ke use kore karon aki website a alada page gale jate boje aki user
app.use(passport.initialize());//middleware initialize passport
app.use (passport.session());
//it is use for static authentic method
passport.use(new LocalStrategy(User.authenticate() ));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash
app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error= req.flash("error");
  res.locals.currUser = req.user;
  next(); //use hobe index.ejs
});



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all("*", (req, res,next) => {
  next(new ExpressError(404, "Page not Found !"));
});

//errror middleware
app.use((err, req, res, next)=> {
  let {statusCode= 500, message="Something went wrong!"} = err;
  // res.send("something went wrong!");
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", {message})
})

app.listen(8080, () => {
    console.log("server is listing port 8080");
});