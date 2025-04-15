const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review.js");
const review = require("./review.js");
const { string } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  geometry:  {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  catagory: {
    type: String,
    enum: ["Trending","Rooms","Iconic cities","Amazing pools","Mountain","Beach","Farm","Camping","Lake","Snows","Cabin","Islands"]
  }
});

listingSchema.post("findOneAndDelete",async (listing) => {
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
  
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;