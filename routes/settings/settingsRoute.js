const express = require('express')
const router = express.Router()

const settingsController = require('../../controllers/settings/settingsController')

router.get('/', settingsController.setting_index_get)
router.post('/', settingsController.setting_post)
router.put('/', settingsController.setting_update)

module.exports = router