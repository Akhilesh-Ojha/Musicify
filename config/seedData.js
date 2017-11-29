

function seedDB() {
    var data =[];
    var User = require ('../models/user');
    var oAuth_id;
    var oAuth_id_arr = [];
    var firstname = ['Agam','Akhil','Shubham',
        'Akshay','Pranav','Rohit',
        'Tushar','Amrit','Souryadeep',
        'Nitish','Sanchita','Aishwarya',
        'Malaika','Reha','Ashish'];
    var lastName = ['Gupta','Ojha','Singh',
        'Ojha','Karnwal','Goel','Jaiswal'
        ,'Kashyap','Vardhan','Mukherjee'
        ,'Pandey','Ghosh','Sharma'
        ,'Kumar','Vaid'];
    var email = ['crobles@gmail.com', 'ullman@outlook.com', 'calin@sbcglobal.net',
        'qrczak@yahoo.ca', 'matty@sbcglobal.net', 'jbryan@mac.com',
        'tamas@mac.com', 'ingolfke@verizon.net', 'brickbat@yahoo.com',
        'studyabr@aol.com'];
    var oAuth_id = [
        '414312703178741450000','678252490774305300000', '636389428484428000000',
        '91360397948867080000','187477485445331400000','112973052048939160000',
        '909574355349151500000','88108863456135770000','637975490548026600000',
        '344024697444793400000',
        '41431270317874145001','678252490774305300001', '636389428484428000001',
        '91360397948867080001','187477485445331400001','112973052048939160001',
        '909574355349151500001','88108863456135770001','637975490548026600001',
        '344024697444793400001',
        '414312703178741450002','678252490774305300002', '636389428484428000002',
        '91360397948867080002','187477485445331400002','112973052048939160002',
        '909574355349151500002','88108863456135770002','637975490548026600002',
        '344024697444793400002'

    ]
    for (var i = 0 ; i < 10 ; i++){
        // while(oAuth_id_arr.indexOf(oAuth_id) == -1){
        //     oAuth_id = Math.floor((Math.random() * 1000000000000000000000) + 1);
        //     oAuth_id_arr.push(oAuth_id);
        // }
        var friends = [{}];
        var friendCount = 0;
        var id = oAuth_id[Math.floor((Math.random() * 9) + 1)];
        while (friendCount < 5){
            friend_id = oAuth_id[Math.floor((Math.random() * 9) + 1)];
            while(friend_id == id && friends.indexOf(friend_id) == -1){
                friend_id = oAuth_id[Math.floor((Math.random() * 9) + 1)]
            }
            var oAuth_id_friend = {oAuth_id:friend_id};
            friends.push(oAuth_id_friend);
            friendCount++;
        }
        var obj = {
            provider : "google",
            firstName : firstname[Math.floor((Math.random() * 14) + 1)],
            lastName : lastName[Math.floor((Math.random() * 13) + 1)],
            email : email[Math.floor((Math.random() * 9) + 1)],
            oAuth_id :  Math.floor((Math.random() * 1000000000000000000000) + 1)
        };
        data.push(obj);
    }
    data.forEach(function (seed) {
        User.create(seed, function (err, user) {
            if (err)
                console.log(err);
            else{
                console.log("saving" + user);
                user.save();
            }

        })
    })
    
    }
module.exports = seedDB;




