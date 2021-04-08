const express = require('express')
const router = express.Router()

const taskController = require('../../controllers/task/taskController')

router.get('/', taskController.task_index_get) // When todolist page loads
router.post('/', taskController.task_create_post) // Todolist request to create an item
router.put('/', taskController.task_update_post) // Todolist request to update item status
router.delete('/', taskController.task_delete_post) // Todolist request to delete an item

module.exports = router