const router = require('express').Router();
const passport = require('passport');


router.get('/google',
    passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read',
                'https://www.googleapis.com/auth/youtube.readonly'
            ],
            accessType: 'offline'
            //approvalPrompt: 'force'
        }
    ));


router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/profile');
    });
// var google = require('googleapis');
//google auth variables
// var youtube = google.youtube({
//     version: 'v3',
//     auth: "AIzaSyBdprYO6NlR78CpPlWj0LUj1XsMHptSfnQ"
// });


// router.get("/search/:q", middleware.ensureAuthenticated, function (req, res) {
//     youtube.search.list({
//         part: 'snippet',
//         q: req.params.q,
//         type : 'video'
//     }, function(err, data, response) {
//         if (err) {
//             console.error('Error: ' + err);
//             res.json({
//                 status: "error"
//             });
//         }
//         if (data) {
//             console.log(data);
//             res.json({
//                 status: "ok",
//                 data: data
//             });
//         }
//         if (response) {
//             console.log('Status code: ' + response.statusCode);
//         }
//     });
// });

module.exports = router;