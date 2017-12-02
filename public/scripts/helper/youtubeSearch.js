alert("Connected");

function searchVideo(q) {
    var query = q;
    console.log(query);
    $("#search_video").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://suggestqueries.google.com/complete/search?" +
                "client=youtube&ds=yt&client=firefox&q=" + query,
                dataType: "jsonp",
                success: function (data, textStatus, req) {
                    // console.log(data);
                    // console.log(data[1]);
                    response(data[1]);
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            console.log(ui.item.value);
            query = ui.item.value;
            //youtubeAPI(ui.item.value);
            // $.ajax({
            //     url: "/search/video/results/"+query,
            //     type: "GET",
            //     success: function (data) {
            //     }
            // });
            location.href = "/search/video/results/" + query;
            // youtube.search.list({
            //     part: 'snippet',
            //     q: query,
            //     type: 'video'
            // },function (err, data, response) {
            //     if (err) {
            //         console.error('Error: ' + err);
            //         res.json({
            //             status: "error"
            //         });
            //     }
            //     if (data) {
            //         // console.log(typeof data);
            //         //  return res.json({
            //         //      status: "ok",
            //         //      data: data
            //         //  });
            //         //dataFinal = data;
            //         console.log(data);
            //         //res.render('resultsVideo',{results:data})
            //     }
            // });
        }

    });

}

/*

    $("#nextButton").click(function () {
        var currentURL = window.location.href;
        console.log(currentURL);
        location.href = currentURL + "/next/" + results.nextPageToken;
    });


    $("#prevButton").click(function () {
        var currentURL = window.location.href;
        console.log(currentURL);
        location.href = currentURL + "/prev/" + results.prevPageToken;
    });
*/


function nextPage(nextPageToken){
    console.log("in nextPAge function, nextPageToken-- "+ nextPageToken);
    var currentURL = window.location.href;
    console.log(currentURL);
    location.href = currentURL + "next/" + nextPageToken;
}


function prevPage(prevPageToken){
    var currentURL = window.location.href;
    location.href = currentURL + "prev/" + prevPageToken;
}
