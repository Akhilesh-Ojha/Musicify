var mongoose = require("mongoose");


var UserSchema = new mongoose.Schema({
    provider:String,
    oAuth_id:String,
    image:String,
    firstName: String,
    lastName: String,
    email: String,
    createdAt: Date
});


module.exports = mongoose.model("User", UserSchema);