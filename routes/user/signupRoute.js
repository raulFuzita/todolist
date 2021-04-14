const express = require('express')
const { check } = require('express-validator'),
router = express.Router()

const userController = require('../../controllers/user/userController')

router.get('/', userController.user_signup_get) // When signup page loads
router.post('/',[
    check('name').isLength({max: 180}).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({min: 8, max: 180}).escape(),
    check('confirmPassword').isLength({min: 8, max: 180}).escape()
], userController.user_signup_post) // When a request is made from signup page

module.exports = router

