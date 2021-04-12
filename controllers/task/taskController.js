const taskFacade = require('../../models/facades/task_facade')

/**
 * This function renders todolist. If a user is not logged in 
 * it'll redirect to url domain root.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.task_index_get = async (req, res) => {

    const {user} = req.session
    if (!user)
        res.redirect('/');
    
    tasks = await taskFacade.getAllTasks(user.id)
    // Renders todolist and send as response a session and tasks
    res.render('todolist', {
        session: req.session, 
        email: req.session.email,
        tasks: tasks
    })
}

/**
 * This function handle a post request to create a new item.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.task_create_post = async (req, res) => {

    const {user} = req.session
    const {id, task} = req.body

    if (!user) 
        res.status(404).render('404', {session: req.session});
    
    await taskFacade.createTask({
        userId: user.id,
        taskId: id,
        task: task.trim()
    })
    // Renders todolist again and passes a session as response.
    res.render('todolist', {session: req.session})
}

/**
 * This function will update an item information such as item's status.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.task_update_post = async (req, res) => {

    const {user} = req.session
    const {id, status} = req.body

    if (!user) 
        res.status(404).render('404', {session: req.session});
    
    console.log({return: await taskFacade.updateTask({
        userId: user.id,
        taskId: id,
        status: status
    })}); // Updates user's tasks
    // Renders todolist again and passes a session as response.
    res.render('todolist', {session: req.session})
}

/**
 * This function deletes a task, also refered as item.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
exports.task_delete_post = async (req, res) => {

    const {user} = req.session
    const {id} = req.body

    if (!user) 
        res.status(404).render('404', {session: req.session})
        
    await taskFacade.deleteTask({
        userId: user.id,
        taskId: id
    })
    // Renders todolist again and passes a session as response.
    res.render('todolist', {session: req.session})
}