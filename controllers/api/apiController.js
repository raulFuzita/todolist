const TaskDAO = require('../../models/dao/mongoDB/task_dao');
const Task = require('../../models/task/task');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.task_get = async (req, res) => {
    jwt.verify(req.token, process.env.API_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const taskDAO = new TaskDAO()
            taskDAO.getByUserId(decoded.id)
            .then((result) => {
                const {tasks} = result.user;
                res.json({tasks})
            })
            .catch((err) => res.json({}))
        }
    })
}

exports.task_post = async (req, res) => {
    jwt.verify(req.token, process.env.API_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
        } else {

        }
    })
}

exports.task_delete = async (req, res) => {

}

exports.task_update = async (req, res) => {

}
