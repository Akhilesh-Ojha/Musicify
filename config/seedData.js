

module.exports = {
    foo: function () {
        // whatever
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
        for (var i =0 ; i < 10 ; i++){
            var User = new User();
            User.provider= "google";
            User.firstName = firstname[Math.floor((Math.random() * 14) + 1)];
            User.lastName = lastName[Math.floor((Math.random() * 13) + 1)];
            User.email = email[Math.floor((Math.random() * 9) + 1)];
            oAuth_id = Math.floor((Math.random() * 1000000000000000000000) + 1);
            while(oAuth_id_arr.indexOf(oAuth_id) == -1){
                oAuth_id = Math.floor((Math.random() * 1000000000000000000000) + 1);
            }
            User.oAuth_id = oAuth_id;
            User.save(function (err , createdUser){
                if (err) {
                    console.log(err);  // handle errors!
                } else {
                    console.log("saving user ..." + createdUser);

                }
            })
        }
    }
};


