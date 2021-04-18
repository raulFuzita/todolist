const express = require('express')
const { body } = require('express-validator'),
router = express.Router()

const userController = require('../../controllers/user/userController')

router.get('/', userController.user_signup_get) // When a user signup, page loads
router.post('/',[
    body('name').isLength({max: 180}).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 8, max: 180}).escape(),
    body('confirmPassword').isLength({min: 8, max: 180}).escape()
], userController.user_signup_post) // When a request is sent from signup page

module.exports = router

