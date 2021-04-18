const express = require('express')
const { body } = require('express-validator'),
router = express.Router(),
settingsController = require('../../controllers/settings/settingsController')

router.get('/', settingsController.setting_index_get)
router.post('/',[
    body('password').isLength({min: 8, max: 180}).escape(),
    body('confirmPassword').isLength({min: 8, max: 180}).escape()
], settingsController.setting_password_post)
router.put('/', settingsController.setting_auth_update)

module.exports = router