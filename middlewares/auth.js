const passport = require('passport');
const User = require('../models/Registration');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')


module.exports = verifyLogin = () => {
    console.log('verifylogin hitted')
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch)
            if (!user) return done(null, false);
            if (!isMatch) return done(null, false);
            return done(null, user)
        } catch (error) {
            return done(error)
        }

    }))
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    })
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user.id)
    })
}