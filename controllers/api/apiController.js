const taskFacade = require('../../models/facades/task_facade'),
apiFacade = require('../../models/facades/api_facade')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const tokenSecret = process.env.API_SECRET || 'token_secret'

exports.task_get = async (req, res) => {

    jwt.verify(req.token, tokenSecret, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {
            apiFacade.isValidToken(req.token, decoded.id)
            .then((r) => {
                taskFacade.getAllTasks(decoded.id)
                .then((tasks) => res.json({tasks}))
                .catch((err) => res.json({}))
            })
            .catch((r) => res.sendStatus(403))
        }
    })
}

exports.task_post = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.sendStatus(405)
        return
    }

    console.log('Test API')

    jwt.verify(req.token, tokenSecret, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const taskId = new Date().valueOf().toString()
            const {task} = req.body
            const {id} = decoded

            apiFacade.isValidToken(req.token, decoded.id)
            .then((r) => {
                taskFacade.createTask({userId: id, taskId, task: task.trim()})
                .then(() => res.sendStatus(200))
                .catch(() => res.sendStatus(500))
            })
            .catch((r) => res.sendStatus(403))
        }
    })
}

exports.task_delete = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.sendStatus(403)
        return
    }

    jwt.verify(req.token, tokenSecret, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const {taskId} = req.body
            const {id} = decoded

            apiFacade.isValidToken(req.token, decoded.id)
            .then((r) => {
                taskFacade.deleteTask({userId: id, taskId})
                .then(() => res.sendStatus(200))
                .catch(() => res.sendStatus(500))
            })
            .catch((r) => res.sendStatus(403))
        }
    })
}

exports.task_update = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.sendStatus(403)
        return
    }

    jwt.verify(req.token, tokenSecret, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const {taskId, status} = req.body
            const {id} = decoded

            apiFacade.isValidToken(req.token, decoded.id)
            .then((r) => {
                taskFacade.updateTask({userId: id, taskId, status})
                .then(() => res.sendStatus(200))
                .catch(() => res.sendStatus(500))
            })
            .catch((r) => res.sendStatus(403))
        }
    })
}
