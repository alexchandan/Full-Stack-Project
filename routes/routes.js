const express = require('express');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/', UserController.home)
router.get('/login', UserController.login)
// router.post('/login', AuthController.login)
router.post('/registration', AuthController.newUser)
router.get('/registration', UserController.registration)

module.exports = router;