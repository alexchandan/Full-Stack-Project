// module.exports = isAuthenticated = (req, res, next) => {
//     console.log('isauthenticated')
//     if (req.session.user) return next();
//     req.flash('error', "You must be logged in ")
//     res.redirect('/login')
// }