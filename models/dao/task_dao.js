const fs = require('fs');
const path = require("path");
var Validator = require('jsonschema').Validator;

const TaskDAO = {

    // Directories where data and schema are stored.
    taskFile: '/database/tasks/tasks.json',
    schemaFile: '/database/tasks/tasks_schema.json',

    /**
     * This method create a new user. If the object doesn't match
     * the schema it'll not be created and a boolean is returned.
     * It returns true if a user is created. Otherwise false.
     * @param {Object} user - A user object.
     * @returns boolean
     */
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

    /**
     * This function returns a user object if it's found. Otherwise null.
     * @param {number} id - ID of the user.
     * @returns Object
     */
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

    /**
     * This function deletes user based on an ID.
     * If user is found and removed it'll return true. Otherwise false.
     * @param {number} id - ID of the user.
     * @returns boolean
     */
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

    /**
     * This function updates a user. It returns true if user is found and updated. Otherwise false.
     * @param {Object} user - It's an object of user. It's expected an object that match the schema.
     * @returns boolean
     */
    update: function(user){
        let list = this.getAll();
        if (!list) return false; // Returns false if list is empty or null
        for (const prop in list){
            const tempUser = list[prop].user;
            if (tempUser.id === user.id){
                list[prop].user = user;
                return this.saveData({list: list});
            }
        }
        return false;
    },

    /**
     * This function returns all objects from a file.
     * If the file content is not valid accroding to a schema,
     * then it'll return null.
     * @returns Object
     */
    getAll: function(){

        let taskData = this.loadFile(this.taskFile);
        let schemaData = this.loadFile(this.schemaFile);

        if (this.validateData(taskData, schemaData))
            return taskData.list;

        return null;
    },

    /**
     * This function loads a file content based on utf8 and returns an
     * object.
     * @param {string} filePath - The location where the file read from.
     * @returns Object
     */
    loadFile: function(filePath){
        let content = fs.readFileSync(path.resolve("./") + filePath, 'utf8');
        return JSON.parse(content);
    },

    /**
     * This function will create a file with a content.
     * A JSON schema is loaded and data is validate against the schema.
     * If everything has worked well it returns true. Otherwise false.
     * @param {Object} data - It's a JSON object
     * @returns boolean
     */
    saveData: function(data){
        let schemaData = this.loadFile(this.schemaFile);
        if (this.validateData(data, schemaData)) {
            let content = JSON.stringify(data, null, 4);
            this.createFile(content, this.taskFile);
            return true;
        }
        return false;
    },

    /**
     * This function creates a file with a content in a specified directory.
     * @param {string} content - Content will be written in a file.
     * @param {string} filePath - The location where the file should be written.
     */
    createFile: function(content, filePath) {
        fs.writeFile(path.resolve("./") + filePath, content, () => {
            console.log('File was written succssfully');
        });
    },

    /**
     * This function validates a JSON data against a JSON schema
     * @param {Object} taskData - A JSON data object
     * @param {Object} taskSchema - A JSON Schema object
     */
    validateData: function (taskData, taskSchema) {
        let validator = new Validator();
        let result = validator.validate(taskData, taskSchema);
        return result.valid;
    }
}

module.exports = TaskDAO;