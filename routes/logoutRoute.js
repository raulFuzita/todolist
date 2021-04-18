const express = require('express'),
router = express.Router(),
logoutController = require('../controllers/logout/logoutController')

// calls controller to clean up the session
router.post('/', logoutController.logout)

module.exports = router