const fs = require('fs');
const path = require("path");

// npm i jsonschema
var Validator = require('jsonschema').Validator;

const UserDAO = {

    userFile: '/database/users/users.json',
    schemaFile: '/database/users/users_schema.json',

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

    getAll: function(){

        let userData = this.loadFile(this.userFile);
        let schemaData = this.loadFile(this.schemaFile);

        if (this.validateData(userData, schemaData))
            return userData.users;

        return null;
    },

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

    update: function(user){
        let users = this.getAll();
        if (!users) return false;
        for (const prop in users){
            const tempUser = users[prop].user;
            if (tempUser.id === user.id){
                users[prop].user = user;
                break;
            }
        }
        return this.saveData({users: users});
    },

    loadFile: function(filePath){
        let content = fs.readFileSync(path.resolve("./") + filePath, 'utf8');
        return JSON.parse(content);
    },

    saveData: function(data){
        let schemaData = this.loadFile(this.schemaFile);

        if (this.validateData(data, schemaData)) {
            let content = JSON.stringify(data, null, 4);
            this.createFile(content, this.userFile);
            return true;
        }
        return false;
    },

    createFile: function(content, filePath) {
        fs.writeFile(path.resolve("./") + filePath, content, () => {
            console.log('File was written succssfully');
        });
    },

    validateData: function (userData, userSchema) {
        let validator = new Validator();
        let result = validator.validate(userData, userSchema);
        return result.valid;
    }
}

module.exports = UserDAO;