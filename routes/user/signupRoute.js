const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user/userController')

router.get('/', userController.user_signup_get) // When signup page loads
router.post('/', userController.user_signup_post) // When a request is made from signup page

module.exports = router

