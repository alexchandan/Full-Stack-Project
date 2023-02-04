module.exports = isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        const returnTo = res.cookie('returnTo', `${req.originalUrl}`)
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must sign in  first!')
        return res.redirect('/login')
    }
    next();
}