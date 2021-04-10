const Task = require('../../../database/tasks/mongoDB/task_schema')
class TaskDAO {

    /**
     * This method create a new user. If the object doesn't match
     * the schema it'll not be created and a boolean is returned.
     * It returns true if a user is created. Otherwise false.
     * @param {Object} user - A user object.
     * @returns boolean
     */
    async create (userTask){
        console.log('Check user: ', userTask)
        const task = new Task(userTask)
        return await task.save()
    }

    async append (userTask){
        const {userId, taskId, status, task} = userTask
        return await Task.updateOne(
            {"user.id": userId},
            {
                "$push": {
                    "user.tasks": {"id": taskId, "status": status, "task": task}
                }
            }
        )
    }


    /**
     * This function returns a user object if it's found. Otherwise null.
     * @param {number} id - ID of the user.
     * @returns Object
     */
    async getById(id) {
        return await Task.findById(id)
    }

    async getByUserId(id) {
        return await Task.findOne({"user.id": id})
    }

    /**
     * This function deletes user based on an ID.
     * If user is found and removed it'll return true. Otherwise false.
     * @param {number} id - ID of the user.
     * @returns boolean
     */
    async deleteById(userTask) {
        const {userId, taskId} = userTask;
        return await Task.updateOne(
            {"user.id": userId},
            {
                "$pull": {
                    "user.tasks": {"id": taskId}
                }
            }
        )
    }

    /**
     * This function updates a user. It returns true if user is found and updated. Otherwise false.
     * @param {Object} user - It's an object of user. It's expected an object that match the schema.
     * @returns boolean
     */
    async update(task) {
        
        const {userId, taskId, status} = task;
                
        return await Task.updateOne(
            {"user.id": userId, "user.tasks.id": taskId},
            {
                "$set": {
                    "user.tasks.$.status":  status
                }
            }
        )
    }

    /**
     * This function returns all objects from a file.
     * If the file content is not valid accroding to a schema,
     * then it'll return null.
     * @returns Object
     */
    async getAll(fun) {
        return await Task.find()
    }
}

module.exports = TaskDAO