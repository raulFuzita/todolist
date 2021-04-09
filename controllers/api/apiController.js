const taskFacade = require('../../models/facades/task_facade')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.task_get = async (req, res) => {
    jwt.verify(req.token, process.env.API_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {
            taskFacade.getAllTasks(decoded.id)
            .then((tasks) => res.json({tasks}))
            .catch((err) => res.json({}))
        }
    })
}

exports.task_post = async (req, res) => {
    jwt.verify(req.token, process.env.API_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {

            const taskId = new Date().valueOf().toString()
            const {task} = req.body
            const {id} = decoded

            if (!task) {
                res.sendStatus(405)
                return
            }
                
            taskFacade.createTask({userId: id, taskId, task: task.trim()})
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
        }
    })
}

exports.task_delete = async (req, res) => {
    jwt.verify(req.token, process.env.API_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {

            const {taskId} = req.body
            const {id} = decoded

            if (!taskId) {
                res.sendStatus(405)
                return
            }

            taskFacade.deleteTask({userId: id, taskId})
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
        }
    })
}

exports.task_update = async (req, res) => {
    jwt.verify(req.token, process.env.API_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {

            const {taskId, status} = req.body
            const {id} = decoded

            if (!taskId || typeof status === 'undefined') {
                res.sendStatus(405)
                return
            }

            taskFacade.updateTask({userId: id, taskId, status})
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
        }
    })
}
