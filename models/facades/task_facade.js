const TaskDAO = require('../dao/mongoDB/task_dao')
const Task = require('../task/task')

exports.getAllTasks = async (userId) => {
    const taskDAO = new TaskDAO()
    const data = await taskDAO.getByUserId(userId)
    return data ? data.user.tasks : []
}

exports.createTask = async (userTask) => {

    const {userId, taskId, task} = userTask
    const taskDAO = new TaskDAO()

    if(!await taskDAO.getByUserId(userId)) {
        const newTask = new Task(userId);
        newTask.createTask(taskId, task);
        const user = newTask.getObjectTask();
        console.log({return: await taskDAO.create(user)})
    } else {
        const status = false
        const newTask = {userId, taskId, status, task}
        console.log({return: await taskDAO.append(newTask)})
    }
}

exports.updateTask = async (task) => {
    const taskDAO = new TaskDAO()
    return await taskDAO.update(task)
}

exports.deleteTask = async (userTask) => {

    const {userId, taskId, task} = userTask
    const taskDAO = new TaskDAO()

    if(await taskDAO.getByUserId(userId)){
        console.log({return: await taskDAO.deleteById({userId, taskId})})
    } else 
        console.log('Task doesn\'t exist')
}

