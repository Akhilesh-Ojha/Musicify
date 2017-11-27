var middlewareObj = {};

middlewareObj.ensureAuthenticated = function(req, res, next) {
    if (req.user) {
        console.log("In is ensureAuthenticated");
        return next();
    }
    res.redirect('/login');
};

module.exports = middlewareObj;
