const express = require('express'),
router = express.Router(),
settingsController = require('../../controllers/settings/settingsController')

router.post('/', settingsController.setting_profile_delete)

module.exports = router