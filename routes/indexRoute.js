const express = require('express')
const router = express.Router()

const indexController = require('../controllers/index/indexController')

// Renders /index and passes session for some operations on the client side.
router.get('/', indexController.get_index)

module.exports = router