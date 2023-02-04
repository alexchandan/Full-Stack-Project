const express = require('express');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const productContoller = require('../controllers/productController')
const router = express.Router();
const passport = require('passport')
const isLoggedIn = require('../middlewares/isLoggedIn');
const catchAsync = require('../utils/catchAsync');
const { isAuthor } = require('../middlewares/isAuthor');

router.get('/login', UserController.login);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(async (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.cookies.returnTo || '/';
    res.clearCookie('returnTo');
    res.redirect(redirectUrl);
}))

router.get('/', UserController.home)

router.post('/registration', AuthController.newUser)
router.get('/registration', UserController.registration)

router.get('/logout', (req, res) => {
    req.logOut(() => {
        req.flash('success', 'You have been logged in successfully!')
        res.redirect('/login');
    })
})
// Product handler
router.get('/product/add', isLoggedIn, UserController.addProduct)
router.post('/product/add', isLoggedIn, productContoller.addProductDoc)

router.get('/product/show', isLoggedIn, productContoller.showProduct)
router.get('/product/show/:id', isLoggedIn, productContoller.showById)

router.get('/product/show/:id/edit', isLoggedIn, isAuthor, productContoller.editProduct)
router.post('/product/show/:id/edit', isLoggedIn, isAuthor, productContoller.updateProduct)

router.post('/delete/:id', isLoggedIn, productContoller.deleteProduct)

router.get('/projects', isLoggedIn, UserController.projectslist)

module.exports = router;