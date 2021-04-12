const express = require('express'),
router = express.Router(),
logoutController = require('../controllers/logout/logoutController')

// Renders /index and passes session for some operations on the client side.
router.post('/', logoutController.logout)

module.exports = router