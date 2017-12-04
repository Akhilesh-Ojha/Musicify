alert("connected");

function search(q) {
    console.log(q);
    if (q.length > 2) {
        console.log("query:" + q);
        $.ajax({
            type: "GET",
            url: "/users/friendSearch/" + q,
            success: function (data) {
                console.log("here");
                //data = JSON.parse(data);
                var output = "";
                data.list.forEach(function (t) {
                    output +=
                        '<div class="card three wide column" >' +

                            '<div class="image">' +
                                '<img src="/assets/matthew.png"' +
                                    'onclick=showProfile(' + t.oAuth_id + ')>' +
                            '</div>' +
                            '<div class="content">' +
                                '<div class="header">'
                                    + t.firstName + " " + t.lastName +
                                '</div>' +
                            '</div>' +
                            '<div class="extra content">' +
                                '<div class="ui button" ' +
                                    'id="follow"' +
                                    'onclick=addFriend(' + t + ')>' + isFriend(t) +
                                '</div>' +
                            '</div>' +
                        '</div>'
                });
                document.getElementById("user_placeholder").innerHTML = output;
            }
        });
    }

}


function isFriend(t) {
    if (t)
        return "Follow";
    return "UnFollow";

}

function showProfile(user_id) {
    location.href = "/users/profile/" + user_id;
}

function addFriend(user) {
    console.log(id);
    console.log("val:" + value);

    if (user.isFriend) {
        $.ajax({
            url: "/users/addFriend?q=" + user.oAuth_id + "&follow=1",
            type: "GET",
            success: function (data) {
            }
        });
    }
    else {
        $.ajax({
            url: "/users/addFriend?id=" + user.oAuth_id + "&follow=0",
            type: "GET",
            success: function (data) {
            }
        });
    }


}






