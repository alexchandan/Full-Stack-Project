const express = require('express');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const productContoller = require('../controllers/productController')
const router = express.Router();

router.get('/', UserController.home)
// Authentication
router.get('/login', UserController.login)
router.post('/registration', AuthController.newUser)
router.get('/registration', UserController.registration)
// Product handler
router.get('/product/add', UserController.addProduct)
router.post('/product/add', productContoller.addProductDoc)
router.get('/product/show', productContoller.showProduct)
router.get('/product/show/:id', productContoller.showById)
router.get('/product/show/:id/edit', productContoller.editProduct)
router.post('/product/show/:id/edit', productContoller.updateProduct)
router.post('/delete/:id', productContoller.deleteProduct)
// Project lists
router.get('/projects', UserController.projectslist)

module.exports = router;