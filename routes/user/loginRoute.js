const express = require('express')
const { body } = require('express-validator'),
router = express.Router(),
userController = require('../../controllers/user/userController')

router.get('/', userController.user_login_get) // When login page loads
router.post('/',[
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 8, max: 180})
], userController.user_login_post) // When a request is made from login page

module.exports = router

