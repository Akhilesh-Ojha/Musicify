var mongoose = require("mongoose");


var UserSchema = new mongoose.Schema({
    provider:String,
    oAuth_id:String,
    image:String,
    firstName: String,
    lastName: String,
    email: String,
    createdAt: Date,
    musicifyAccessToken: String,
    accessToken : String,
    refreshToken : {
        access_token: String,
        expires_in : Number,
        id_token : String,
        token_type : String
    },
    friends : [
        {
            oAuth_id : String
        }
    ],
    isFriend:Boolean
});


module.exports = mongoose.model("User", UserSchema);