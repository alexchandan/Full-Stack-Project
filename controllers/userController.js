const productModel = require('../models/Product')
class UserController {
    static home = (req, res) => {
        res.render('home', { title: "Home" });
    }
    static login = (req, res) => {
        res.render('auth/login', { title: "Login" });
    }
    static registration = (req, res) => {
        res.render('auth/registration', { title: "Registration" });
    }

    static project = (req, res) => {
        res.status(200).send('You can now check all the projects', { title: "project" })
        // res.status(200).send("project", { title: 'project' })
    }

    static addProduct = (req, res) => {
        res.render('product/addProduct', { title: "Add Product" })
    }

    static projectslist = (req, res) => {
        res.render('projects.ejs', { title: "Projects List" })
    }

}

module.exports = UserController;