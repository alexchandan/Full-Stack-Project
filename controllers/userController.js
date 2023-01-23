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

}

module.exports = UserController;