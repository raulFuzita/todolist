const taskDAO = require('../../models/dao/task_dao');
const Task = require('../../models/task/task');
const dao = require('../../models/dao/task_dao');

const task_index_get = (req, res) => {
    if (!req.session.user)
        res.redirect('/');
    
    const userId = req.session.user.id;
    let user = taskDAO.getById(userId);

    tasks = user ? user.tasks : null;
    
    res.render('todolist', {
        session: req.session, 
        email: req.session.email,
        tasks: tasks
    });
}

const task_create_post = (req, res) => {

    if (!req.session.user) 
        res.status(404).render('404', {session: req.session});

    if (req.session.user && req.body){
        const userId = req.session.user.id;
        let userTask = taskDAO.getById(userId);
        const id = req.body.id;
        const task = req.body.task.trim();
        const newTask = new Task(userId);

        if(userTask)
            newTask.tasks = userTask.tasks;

        newTask.createTask(id, task);
        const user = newTask.getObjectTask();

        if(!userTask)
            console.log(dao.set(user));
        else 
            console.log(dao.update(user));

    } else {
        console.log('There is no request in the body request');
    }
    res.render('todolist', {session: req.session});
}

const task_update_post = (req, res) => {

    if (!req.session.user) 
        res.status(404).render('404', {session: req.session});

        if (req.session.user && req.body){
            const userId = req.session.user.id;
            let userTask = taskDAO.getById(userId);
            const id = req.body.id;
            const status = req.body.status;
            const newTask = new Task(userId);
            if(userTask){
                newTask.tasks = userTask.tasks;
                newTask.updateStatus(id, status);
                const user = newTask.getObjectTask();
                console.log(dao.update(user));
            } else {
                console.log('Task doesn\'t exist');
            }   
    
        } else {
            console.log('There is no request in the body request');
        }
        res.render('todolist', {session: req.session});

}

const task_delete_post = (req, res) => {

    if (!req.session.user) 
        res.status(404).render('404', {session: req.session});

        if (req.session.user && req.body){
            const userId = req.session.user.id;
            let userTask = taskDAO.getById(userId);
            const id = req.body.id;
            const newTask = new Task(userId);
            if(userTask){
                newTask.tasks = userTask.tasks;
                newTask.deleteTask(id);
                const user = newTask.getObjectTask();
                console.log(dao.update(user));
            } else {
                console.log('Task doesn\'t exist');
            }   
    
        } else {
            console.log('There is no request in the body request');
        }
        res.render('todolist', {session: req.session});
}

module.exports = {
    task_index_get,
    task_create_post,
    task_update_post,
    task_delete_post
}