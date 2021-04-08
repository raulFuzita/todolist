const express = require('express')
const router = express.Router()

const logoutController = require('../controllers/logout/logoutController')

// Renders /index and passes session for some operations on the client side.
router.get('/', logoutController.logout)

module.exports = router