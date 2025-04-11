const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const{listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner} = require ("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });
const validateListing =(req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    
    if(error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  }

// compact form for same route this is for index & create
  router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single('listing[image]'),validateListing,
    wrapAsync(listingController.createListing)
);
// .post(upload.single('listing[image]'), (req, res)=> {
//   res.send(req.file);
// });

 //New Route
 router.get("/new", isLoggedIn,listingController.renderNewForm);

// compact form for same route this is for show route & update route & delete
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


//main home page Index route
// router.get("/" ,wrapAsync(listingController.index));

 //New Route
// router.get("/new", isLoggedIn,listingController.renderNewForm);

//Show route
// router.get("/:id", wrapAsync(listingController.showListing));

  //create route
//  router.post("/",isLoggedIn,validateListing,
//      wrapAsync(listingController.createListing)
// );

  //edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//update route
// router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

  module.exports = router;