module.exports = function ensureAuthenticated(req, res, next) {
    console.log('Checking authentication...');
    
    console.log('Authenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/index.html');
};
