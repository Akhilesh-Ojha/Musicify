var mongoose = require("mongoose");


var UserSchema = new mongoose.Schema({
    provider:String,
    oAuth_id:String,
    image:String,
    displayName:String,
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
    followers:[
        {
            oAuth_id:String
        }
    ],
    following:[
        {
            oAuthi_id:String
        }
    ],
    playlist:[
        {
            id : String,

        }
    ],
    isFriend:Boolean
});


module.exports = mongoose.model("User", UserSchema);