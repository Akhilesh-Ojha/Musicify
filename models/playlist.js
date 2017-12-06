var mongoose = require("mongoose");



var PlaylistSchema = new mongoose.Schema({
    playlist:[
        {
            image:String,
            name:String,
            description:String,
            sharing:Boolean,
            genre:String,
            songs:[
                {
                    song_id:String,
                    title:String,
                    channelId:String,
                    thumbnail:String,
                    description:String
                }
            ]
        }
    ]
});


module.exports = mongoose.model("Playlist", PlaylistSchema);