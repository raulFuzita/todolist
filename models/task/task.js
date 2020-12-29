class Task {

    constructor(userId) {
        this.userId = userId;
        this.tasks = [];
    }

    createTask(id, task){
        let status = false;
        this.tasks.push({id, status, task});
    }

    addTask(id, status, task){
        this.tasks.push({id, status, task});
    }

    getTask(id){
        for (const prop in this.tasks){
            const task = this.tasks[prop];
            if (task.id === id)
                return task;
        }
        return null;
    }

    updateStatus(id, status){
        for (const prop in this.tasks){
            const task = this.tasks[prop];
            if (task.id === id){
                this.tasks[prop].status = String(status) == "true";
                return true;
            }
        }
        return false;
    }

    deleteTask(id){
        for (let i = 0; i < this.tasks.length; i++) {
            const tempTask = this.tasks[i];
            if (tempTask.id === id){
                this.tasks.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    getObjectTask(){
        let id = this.userId;
        let tasks = this.tasks;
        return {id, tasks};
    }
}

module.exports = Task;