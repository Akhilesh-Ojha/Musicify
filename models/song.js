var mongoose = require("mongoose");


var SongSchema = new mongoose.Schema({

    songs: [
        {
            song_id: String,
            title: String,
            channelId: String,
            thumbnail: String,
            description: String
        }
    ]

});


module.exports = mongoose.model("Song", SongSchema);