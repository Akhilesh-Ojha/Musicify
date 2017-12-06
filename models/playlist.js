var mongoose = require("mongoose");


var PlaylistSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    sharing: Boolean,
    genre: String,
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }
    ]
});


module.exports = mongoose.model("Playlist", PlaylistSchema);