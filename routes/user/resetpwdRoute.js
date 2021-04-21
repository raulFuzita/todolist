const express = require('express')
const { body } = require('express-validator'),
router = express.Router(),
resetpwdController = require('../../controllers/user/resetpwdController')

router.get('/', resetpwdController.reset_pwd_get)
router.get('/:token/', resetpwdController.reset_pwd_get_param)
router.post('/', [
    body('password').notEmpty().isLength({min: 8, max: 180}),
    body('confirmPassword').notEmpty().isLength({min: 8, max: 180}),
    body('token').notEmpty()
], resetpwdController.reset_pwd_post)

module.exports = router