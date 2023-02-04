const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local');
const catchAsync = require('../utils/catchAsync');

module.exports = verifyLogin = () => {
    passport.use(new LocalStrategy(catchAsync(async (username, password, done) => {
        const user = await User.findOne({ email: username });
        if (!user) return done(null, false, { message: "User Not Found!!" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "Password is not valid!" });
        return done(null, user)
    })))
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    })
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user)
    })
}