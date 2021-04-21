const express = require('express')
const { body } = require('express-validator'),
router = express.Router()

const taskController = require('../../controllers/task/taskController')

router.get('/', taskController.task_index_get) // When todolist page loads
router.post('/',[
    body('task').escape()
], taskController.task_create_post) // Todolist request to create an item
router.put('/',[
    body('taskId').notEmpty().isNumeric(),
    body('status').notEmpty().toBoolean()
], taskController.task_update_post) // Todolist request to update item status
router.delete('/',[
    body('taskId').notEmpty().isNumeric(),
], taskController.task_delete_post) // Todolist request to delete an item

module.exports = router