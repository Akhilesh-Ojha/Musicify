alert("connected");
var google = require('googleapis');

var youtube = google.youtube({
    version: 'v3',
    auth: "AIzaSyBdprYO6NlR78CpPlWj0LUj1XsMHptSfnQ"
});

function  youtubeSearch() {

    console.log("here");
    var query = document.getElementById("search_query").value;
    console.log(query);
    youtube.search.list({
        part: 'snippet',
        q: req.params.q,
        type : 'video'
    }, function(err, data, response) {
        if (err) {
            console.error('Error: ' + err);
            res.json({
                status: "error"
            });
        }
        if (data) {
            // console.log(data);
            res.json({
                status: "ok",
                data: data
            });
            document.getElementById("output").textContent = data;
        }
        if (response) {
            //console.log('Status code: ' + response.statusCode);
        }

    });

}

// console.log("here");
// $('input #search_query').keyup( function () {
//     console.log("here");
//     if(this.value.length < 4)
//         return
//     else {
//         console.log("value :" +value);
//         $('#output').val(this.value);
//     }
// });


