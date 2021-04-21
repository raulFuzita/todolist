const express = require('express')
const verifyToken = require('../../models/api/verify_token')
const router = express.Router()
const { body } = require('express-validator')

const apiController = require('../../controllers/api/apiController')

router.get('/', verifyToken, apiController.task_get)
router.post('/', [
    body('task').notEmpty().escape()
], verifyToken, apiController.task_post)
router.delete('/', [
    body('taskId').notEmpty().isNumeric()
], verifyToken, apiController.task_delete)
router.put('/', [
    body('taskId').notEmpty().isNumeric(),
    body('status').notEmpty().toBoolean()
], verifyToken, apiController.task_update)

module.exports = router