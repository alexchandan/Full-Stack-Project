const contactModel = require('../models/Contacts')
const registrationModel = require('../models/Registration')
class AuthController {
    // Creating New User
    static newUser = async (req, res) => {
        try {
            const doc = new registrationModel(req.body)
            console.log(doc)
            if (req.body.password === req.body.confirmPassword) {
                await doc.save()
                res.redirect('/login')
            }
            else {
                res.send("password doesn't match")
            }
        } catch (error) {
            console.log(error)
            res.send('Error at newUser')
        }
    }

    // Verifying Login
    static verifyLogin = async (req, res) => {
        const findUser = await registrationModel.findOne({ email: req.body.email });
        if (!findUser) {
            res.send('Email not found!!!')
        }
        else {
            if (findUser.password === req.body.password) {
                res.send('You have been logged in successfully!!')
            }
            else {
                res.send('Password is not correct!!!')
            }
        }

    }

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

