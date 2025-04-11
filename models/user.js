const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
    //baki username and password  tar sathe hashing and salting o mongoose nijei tairi kore debe so ota korar darkar nai
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);