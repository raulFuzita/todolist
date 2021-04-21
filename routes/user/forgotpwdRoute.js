const express = require('express')
const { body } = require('express-validator'),
router = express.Router(),
forgotpwdController = require('../../controllers/user/forgotpwdController')

router.post('/',[
    body('email').notEmpty().isEmail().normalizeEmail()
], forgotpwdController.forgot_pwd_post)

module.exports = router