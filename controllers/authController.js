const contactModel = require('../models/Contacts')
const Registration = require('../models/Registration');
const flash = require('express-flash')
const registrationModel = require('../models/Registration')
const bcrypt = require('bcrypt');
class AuthController {
    // Creating New User
    static newUser = async (req, res) => {
        const hassedPassword = await bcrypt.hash(req.body.password, 10)
        try {
            const doc = new registrationModel({
                name: req.body.name,
                email: req.body.email,
                password: hassedPassword
            })
            console.log(doc)
            if (req.body.password === req.body.confirmPassword) {
                await doc.save()
                res.redirect('/login')
            }
            else {
                req.flash('danger', 'Password not matched.')
                res.redirect('/registration')
            }
        } catch (error) {
            console.log(error)
            res.send('Error at newUser')
        }
    }

    // Verify Login


    // Contact messages
    static contact = async (req, res) => {
        try {
            const contact = new contactModel(req.body);
            await contact.save();
        } catch (error) {
            console.log(error)
            res.send('Error at contact controller')
        }
    }
}

module.exports = AuthController

