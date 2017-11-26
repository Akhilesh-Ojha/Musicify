var middlewareObj = {};

middlewareObj.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("\nIn is AUNTHENTICATED\n")
        return next();
    }
    console.log("\nNOT AUNTHENTICATED!\n");
    res.redirect('/login');
};

module.exports = middlewareObj;

