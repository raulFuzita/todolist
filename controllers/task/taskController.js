const taskDAO = require('../../models/dao/task_dao');
const Task = require('../../models/task/task');
const dao = require('../../models/dao/task_dao');

/**
 * This function renders todolist. If a user is not logged in 
 * it'll redirect to url domain root.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const task_index_get = async (req, res) => {
    if (!req.session.user)
        res.redirect('/');
    
    const userId = req.session.user.id;
    let user = await taskDAO.getById(userId);
    /* 
        Checks if a user exist by using a ternary operator. 
        Returns a user's tasks. Otherwise null.
    */
    tasks = user ? user.tasks : null;
    // Renders todolist and send as response a session and tasks
    res.render('todolist', {
        session: req.session, 
        email: req.session.email,
        tasks: tasks
    });
}

/**
 * This function handle a post request to create a new item.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const task_create_post = (req, res) => {

    if (!req.session.user) 
        res.status(404).render('404', {session: req.session});

    /*
        If a user session exist and there is a request in the body
        it'll move on to create a new item.
    */
    if (req.session.user && req.body){
        const userId = req.session.user.id; // Gets a user's id and stores in a shorter variable name
        let userTask = taskDAO.getById(userId); // Retrieves a user by passing an ID.
        const id = req.body.id; // Gets item ID
        const task = req.body.task.trim(); // Gets task content and trims to remove spaces at the begining and end of variable
        const newTask = new Task(userId); // Creates a task object
        // Checks if at least one task already exist. If exist all tasks are loaded to the new one.
        if(userTask)
            newTask.tasks = userTask.tasks;

        // Assigns an ID and a task to the task object.
        newTask.createTask(id, task);
        // Returns a user object ready to be written in a file.
        const user = newTask.getObjectTask();
        /*
            If this is the first task for a user it'll be set a task structure in the JSON file.
            If at least one task exist already the user's task is updated with a new one added in.
        */
        if(!userTask)
            console.log(dao.set(user));
        else 
            console.log(dao.update(user));

    } else {
        console.log('There is no request in the body request');
    }
    // Renders todolist again and passes a session as response.
    res.render('todolist', {session: req.session});
}

/**
 * This function will update an item information such as item's status.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const task_update_post = (req, res) => {

    if (!req.session.user) 
        res.status(404).render('404', {session: req.session});

        /*
            If a user session exist and there is a request in the body
            it'll move on to create a new item.
        */
        if (req.session.user && req.body){
            const userId = req.session.user.id; // Gets a user's id and stores in a shorter variable name
            let userTask = taskDAO.getById(userId); // Retrieves a user by passing an ID.
            const id = req.body.id; // Gets item ID
            const status = req.body.status; // Gets item status
            const newTask = new Task(userId); // Creates a task object
            // Checks if the target task exist. 
            if(userTask){
                newTask.tasks = userTask.tasks; // Gets all the user's tasks
                newTask.updateStatus(id, status); // Updates the status for the given ID task
                // Returns a user object ready to be written in a file.
                const user = newTask.getObjectTask();
                console.log(dao.update(user)); // Updates user's tasks
            } else 
                console.log('Task doesn\'t exist');
    
        } else {
            console.log('There is no request in the body request');
        }
        // Renders todolist again and passes a session as response.
        res.render('todolist', {session: req.session});
}

/**
 * This function deletes a task, also refered as item.
 * If session has no user logged in it'll redirect to page 404.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const task_delete_post = (req, res) => {

    if (!req.session.user) 
        res.status(404).render('404', {session: req.session});

         /*
            If a user session exist and there is a request in the body
            it'll move on to create a new item.
        */
        if (req.session.user && req.body){
            const userId = req.session.user.id; // Gets a user's id and stores in a shorter variable name
            let userTask = taskDAO.getById(userId); // Retrieves a user by passing an ID.
            const id = req.body.id; // Gets item ID
            const newTask = new Task(userId); // Creates a task object
            // Checks if the target task exist.
            if(userTask){
                newTask.tasks = userTask.tasks; // Gets all the user's tasks
                newTask.deleteTask(id); // deletes an item based on an ID
                // Returns a user object ready to be written in a file.
                const user = newTask.getObjectTask();
                console.log(dao.update(user)); // Updates user's tasks
            } else 
                console.log('Task doesn\'t exist');
    
        } else {
            console.log('There is no request in the body request');
        }
        // Renders todolist again and passes a session as response.
        res.render('todolist', {session: req.session});
}

module.exports = {
    task_index_get,
    task_create_post,
    task_update_post,
    task_delete_post
}