module.exports = isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn')
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must sign in  first!')
        return res.redirect('/login')
    }
    next();
}