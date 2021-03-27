const fs = require('fs');
const path = require("path");
var Validator = require('jsonschema').Validator;

const UserDAO = {

    // Directories where data and schema are stored.
    userFile: '/database/users/users.json',
    schemaFile: '/database/users/users_schema.json',

    /**
     * This method create a new user. If the object doesn't match
     * the schema it'll not be created and a boolean is returned.
     * It returns true if a user is created. Otherwise false.
     * @param {Object} user - A user object.
     * @returns boolean
     */
    set: function(user){
        let users = this.getAll();
        if (!users) return false;
        for (const prop in users){
            const tempUser = users[prop].user;
            if (tempUser.email === user.email)
                return false;
        }

        users.push({user});
        return this.saveData({users: users});
    },

    /**
     * This function returns a user object if it's found. Otherwise null.
     * @param {number} id - ID of the user.
     * @returns Object
     */
    getById: function(id){
        let users = this.getAll();
        if (!users) return null;
        for (const prop in users){
            const user = users[prop].user;
            if (user.id === id)
                return user;
        }
        return null;
    },

    /**
     * This function returns a user object if it's found. Otherwise null.
     * @param {string} email - Email of the user.
     * @returns Object
     */
    getByEmail: function(email){
        let users = this.getAll();
        if (!users) return null;
        for (const prop in users){
            const user = users[prop].user;
            if (user.email === email)
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
        let users = this.getAll();
        if (!users) return false;
        for (let i = 0; i < users.length; i++) {
            const tempUser = users[i].user;
            if (tempUser.id === id){
                users.splice(i, 1);
                return this.saveData({users: users});
            }
        }
        return false;
    },

    /**
     * This function updates a user. It returns true if user is found and updated. Otherwise false.
     * @param {Object} user - It's an object of user. It's expected an object that match the schema.
     * @returns Object
     */
    update: function(user){
        let users = this.getAll();
        if (!users) return false; // Returns false if list is empty or null
        for (const prop in users){
            const tempUser = users[prop].user;
            if (tempUser.id === user.id){
                users[prop].user = user;
                break;
            }
        }
        return this.saveData({users: users});
    },

    /**
     * This function returns all objects from a file.
     * If the file content is not valid accroding to a schema,
     * then it'll return null.
     * @returns Object
     */
    getAll: function(){

        let userData = this.loadFile(this.userFile);
        let schemaData = this.loadFile(this.schemaFile);

        if (this.validateData(userData, schemaData))
            return userData.users;

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
            this.createFile(content, this.userFile);
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
    validateData: function (userData, userSchema) {
        let validator = new Validator();
        let result = validator.validate(userData, userSchema);
        return result.valid;
    }
}

module.exports = UserDAO;