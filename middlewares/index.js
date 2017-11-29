var middlewareObj = {};

middlewareObj.ensureAuthenticated = function(req, res, next) {
    if (req.user) {
        console.log("In is ensureAuthenticated");
        return next();
    }
    res.redirect('/login');
};

middlewareObj.checkCookie = function (req, res, next) {
    if(req.cookies.musicifyLogin && req.user){
        console.log("musicifyLogin Cookie present..\n");
        return next();
    }
    res.redirect('/login');
}



module.exports = middlewareObj;
