const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const{ reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isReviewAutor} = require ("../middleware.js");
const reviewController = require("../controllers/review.js");
const validateReview =(req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    
    if(error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  }

//Reviews
  //post review route
 router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

//Delete Review route

router.delete("/:reviewId",isLoggedIn,isReviewAutor, wrapAsync(reviewController.destroyReview));

module.exports = router;