const express = require('express')
const verifyToken = require('../../models/api/verify_token')
const router = express.Router()

const apiController = require('../../controllers/api/apiController')

router.get('/', verifyToken, apiController.task_get)
router.post('/', verifyToken, apiController.task_post)
router.delete('/', verifyToken, apiController.task_delete)
router.put('/', verifyToken, apiController.task_update)

module.exports = router