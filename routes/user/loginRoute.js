const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user/userController')

router.get('/', userController.user_login_get) // When login page loads
router.post('/', userController.user_login_post) // When a request is made from login page

module.exports = router

