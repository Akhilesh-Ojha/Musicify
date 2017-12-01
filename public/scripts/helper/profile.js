alert("connected");


function addFriend(id, value) {
    console.log(value);

    if(value === "Follow"){
        $.ajax({

            url: "/users/addFriend?q="+id+"&follow=1",
            type: "GET",
            success: function (data) {
            }
        });
        $("#follow").text("Unfollow");
    }
    else{
        $.ajax({

            url: "/users/addFriend?q="+id+"&follow=0",
            type: "GET",
            success: function (data) {
            }
        });
        $("#follow").text("Follow");
    }

}
