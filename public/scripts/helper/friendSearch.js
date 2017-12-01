alert("connected");

console.log("here");

function search(q) {
    console.log(q);

    $.ajax({
        type: "GET",
        url: "/users/search?q="+q,
        success: function (data) {

        }
    });
}






