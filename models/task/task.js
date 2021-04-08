/**
 * Class Task abstracts simple characteristcs of a task.
 * @author Raul Macedo Fuzita
 * @version 1.0.0
 */
class Task {

    constructor(userId) {
        this.userId = userId;
        this.tasks = [] // Array type
    }

    /**
     * This function takes two parameter to create a task.
     * A new task is added to the tasks property.
     * @param {number} id - ID of the task
     * @param {string} task - Text of the task
     */
    createTask(id, task){
        let status = false
        this.tasks.push({id, status, task})
    }

    /**
     * This function is recommened to added a task
     * to handle the object in different situation or/ and
     * update a data.
     * @param {number} id - ID of the task
     * @param {boolean} status - Status of the task
     * @param {string} task - Text of the task
     */
    addTask(id, status, task){
        this.tasks.push({id, status, task})
    }

    /**
     * This function takes an ID to return a task.
     * If task is not found it returns a null.
     * @param {number} id - ID of the task
     * @returns Object
     */
    getTask(id){
        for (const prop in this.tasks){
            const task = this.tasks[prop];
            if (task.id === id)
                return task
        }
        return null
    }

    /**
     * This function updates the task status. It takes two parameters.
     * If a task is found and updated it returns true. Otherwise false.
     * @param {number} id - ID of the task
     * @param {boolean} status - Status of the task
     * @returns boolean
     */
    updateStatus(id, status){
        for (const prop in this.tasks){
            const task = this.tasks[prop]
            if (task.id === id){
                this.tasks[prop].status = String(status) == "true"
                return true
            }
        }
        return false
    }

    /**
     * This function deletes a task based on an ID.
     * If a task is found and deleted it returns true. Otherwise false.
     * @param {number} id - ID of the task
     * @returns boolean
     */
    deleteTask(id){
        for (let i = 0; i < this.tasks.length; i++) {
            const tempTask = this.tasks[i]
            if (tempTask.id === id){
                this.tasks.splice(i, 1)
                return true
            }
        }
        return false
    }

    /**
     * This function returns an Object with an ID and an Array of tasks.
     * @returns Object
     */
    getObjectTask(){
        let id = this.userId
        let tasks = this.tasks
        return {user: {id, tasks}}
    }
}

module.exports = Task