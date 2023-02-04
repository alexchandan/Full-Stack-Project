const contactModel = require('../models/Contacts')
const User = require('../models/User');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync')
class AuthController {
    // Creating New User
    static newUser = catchAsync(async (req, res) => {
        const { email, name, password, confirmPassword } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            req.flash('error', 'User already exits!')
            console.log(user)
            return res.redirect('/registration')
        }
        if (password == confirmPassword) {
            const hassedPassword = await bcrypt.hash(password, 10); // never declear a variable before condition
            const doc = new User({
                name: name,
                email: email,
                password: hassedPassword
            })
            console.log('this is from user', doc)
            await doc.save();
            res.redirect('/login')
        }
        else {
            req.flash('error', 'Password not matched.')
            res.redirect('/registration')
        }
    })

    // Contact messages
    static contact = catchAsync(async (req, res) => {
        const contact = new contactModel(req.body);
        await contact.save();
    })
}

module.exports = AuthController

