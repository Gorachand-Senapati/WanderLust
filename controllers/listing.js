const Listing = require("../models/listing");

//index page
module.exports.index = async (req, res) => {
    const allListings =  await Listing.find({});
      res.render("listings/index.ejs", {allListings});
    }
//create new page
module.exports.renderNewForm =  (req, res) => {

  res.render("listings/new.ejs");
}
//show
module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
      populate: {
        path: "author",
      }
    }) 
    .populate("owner");
    if(!listing){
      req.flash("error", "The listing is not found !"); 
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
    // console.log(listing);

 };

 //create
 module.exports.createListing = async (req, res,next) => {
  let url = req.file.path;
  let filename = req.file.filename;
         const newListing = new Listing(req.body.listing);
         newListing.owner = req.user._id;
         newListing.image = {url, filename};
         await  newListing.save();
         req.flash("success", "New listing created!");  
     res.redirect("/listings"); 
   }

   //edit
   module.exports.renderEditForm = async(req, res) => {
       let {id} = req.params;
       const listing = await Listing.findById(id);
       if(!listing){
         req.flash("error", "The listing is not found !"); 
         res.redirect("/listings");
       }
      let originalImgUrl = listing.image.url;
      originalImgUrl.replace("/upload", "/upload/h_300,w_250/")
       res.render("listings/edit.ejs", {listing, originalImgUrl});
   }

   //update listing
   module.exports.updateListing = async(req,res)=> {
     if(!req.body.listing) {
       throw new ExpressError(400, "Send valid data for listing");
     }

       let {id} = req.params;
      let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); //(...) deconstruct kore individual value te convert kora
      if(typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url, filename};
      await listing.save();
      }
      req.flash("success", "Listing updated !");
      res.redirect(`/listings/${id}`);
   }
   //delete listing
   module.exports.destroyListing = async (req, res) => {
       let { id } = req.params;
       let deletedListing = await Listing.findByIdAndDelete(id);
       console.log(deletedListing);
       req.flash("success", "Listing Deleted Successfully");  
       res.redirect("/listings");
     }