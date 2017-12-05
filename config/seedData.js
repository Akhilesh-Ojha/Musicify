function seedDB() {
    var data =[];
    var User = require ('../models/user');
    var firstname = ['Agam','Akhil','Shubham',
        'Akshay','Pranav','Rohit',
        'Tushar','Amrit','Souryadeep',
        'Nitish','Sanchita','Aishwarya',
        'Malaika','Reha','Ashish'];
    var lastname = ['Gupta','Ojha','Singh',
        'Ojha','Karnwal','Goel','Jaiswal'
        ,'Kashyap','Vardhan','Mukherjee'
        ,'Pandey','Ghosh','Sharma'
        ,'Kumar','Vaid'];
    var email = ['crobles@gmail.com', 'ullman@outlook.com', 'calin@sbcglobal.net',
        'qrczak@yahoo.ca', 'matty@sbcglobal.net', 'jbryan@mac.com',
        'tamas@mac.com', 'ingolfke@verizon.net', 'brickbat@yahoo.com',
        'studyabr@aol.com'];
    for (var i = 0 ; i < 50 ; i++){
        var firstName = firstname[Math.floor((Math.random() * 14) + 1)];
        var lastName = lastname[Math.floor((Math.random() * 13) + 1)];
        var displayName = firstName + " " + lastName;
        var obj = {
            provider : "google",
            firstName : firstName,
            lastName : lastName,
            displayName : displayName,
            email : email[Math.floor((Math.random() * 9) + 1)],
            oAuth_id :  Math.floor((Math.random() * 1000000000000000000000) + 1),
            isFriend : false
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