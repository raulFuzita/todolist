const taskFacade = require('../../models/facades/task_facade')
const { validationResult } = require('express-validator')
const {createLazyError} = require('../../models/util/errors_util')

const render = (req, res, data={}) => {
    const {error} = req.session
    req.session.error = null
    const errors = JSON.stringify(error)
    res.render('todolist', {session: req.session, data, errors})
}

/**
 * This function renders todolist. If a user is not logged in 
 * it'll redirect to url domain root.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.task_index_get = async (req, res) => {

    const {user, email} = req.session
    if (!user)
        res.redirect('/');
    
    tasks = await taskFacade.getAllTasks(user.id)
    // Renders todolist and send as response a session and tasks
    render(req, res, tasks)
}

/**
 * This function handle a post request to create a new item.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.task_create_post = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.session.error = createLazyError(
            'alert-danger', 'There is no reference to a task or filed is empty')
        render(req, res)
        return
    }

    const {user} = req.session
    const {taskId, task} = req.body

    if (!user) 
        res.status(404).render('404', {session: req.session});
    
    await taskFacade.createTask({userId: user.id, taskId, task})
    // Renders todolist again and passes a session as response.
    render(req, res)
}

/**
 * This function will update an item information such as item's status.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.task_update_post = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.session.error = createLazyError(
            'alert-danger', 'There is no reference to a task or filed is empty')
        render(req, res)
        return
    }

    const {user} = req.session
    const {taskId, status} = req.body

    if (!user) 
        res.status(404).render('404', {session: req.session});
    
    await taskFacade.updateTask({userId: user.id, taskId, status})
    // Updates user's tasks
    // Renders todolist again and passes a session as response.
    render(req, res)
}

/**
 * This function deletes a task, also refered as item.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
exports.task_delete_post = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.session.error = createLazyError(
            'alert-danger', 'There is no reference to a task or filed is empty')
        render(req, res)
        return
    }

    const {user} = req.session
    const {taskId} = req.body

    if (!user) 
        res.status(404).render('404', {session: req.session})
        
    await taskFacade.deleteTask({userId: user.id, taskId})
    // Renders todolist again and passes a session as response.
    render(req, res)
}