const fs = require('fs');
const path = require("path");

// npm i jsonschema
var Validator = require('jsonschema').Validator;

const TaskDAO = {

    taskFile: '/database/tasks/tasks.json',
    schemaFile: '/database/tasks/tasks_schema.json',

    set: function(user){
        let list = this.getAll();
        if (!list) return false;
        for (const prop in list){
            const tempUser = list[prop].user;
            if (tempUser.id === user.id)
                return false;
        }
        list.push({user});
        return this.saveData({list: list});
    },

    getById: function(id){
        let list = this.getAll();
        if (!list) return null;
        for (const prop in list){
            const user = list[prop].user;
            if (user.id === id)
                return user;
        }
        return null;
    },

    deleteById: function(id){
        let list = this.getAll();
        if (!list) return false;
        for (let i = 0; i < list.length; i++) {
            const tempUser = list[i].user;
            if (tempUser.id === id){
                list.splice(i, 1);
                return this.saveData({list: list});
            }
        }
        return false;
    },

    update: function(user){
        let list = this.getAll();
        if (!list) return false;
        for (const prop in list){
            const tempUser = list[prop].user;
            if (tempUser.id === user.id){
                list[prop].user = user;
                return this.saveData({list: list});
            }
        }
        return false;
    },

    getAll: function(){

        let taskData = this.loadFile(this.taskFile);
        let schemaData = this.loadFile(this.schemaFile);

        if (this.validateData(taskData, schemaData))
            return taskData.list;

        return null;
    },

    loadFile: function(filePath){
        let content = fs.readFileSync(path.resolve("./") + filePath, 'utf8');
        return JSON.parse(content);
    },

    saveData: function(data){
        let schemaData = this.loadFile(this.schemaFile);
        // console.log(data);
        if (this.validateData(data, schemaData)) {
            let content = JSON.stringify(data, null, 4);
            this.createFile(content, this.taskFile);
            return true;
        }
        return false;
    },

    createFile: function(content, filePath) {
        fs.writeFile(path.resolve("./") + filePath, content, () => {
            console.log('File was written succssfully');
        });
    },

    validateData: function (taskData, taskSchema) {
        let validator = new Validator();
        let result = validator.validate(taskData, taskSchema);
        return result.valid;
    }
}

module.exports = TaskDAO;