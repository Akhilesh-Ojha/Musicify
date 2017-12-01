alert("connected");

console.log("here");

function search(q) {
    console.log(q);
    $("#friendSearch").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/users/friendSearch/" + q,
                dataType: "array",
                success: function (data, textStatus, req) {
                    // console.log(data);
                    // console.log(data[1]);
                    console.log(data);
                    response(data);
                }
            });
        }
    });
}






