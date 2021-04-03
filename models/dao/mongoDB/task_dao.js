const db = require('../../../database/mongoDB/connector');
const Task = require('../../../database/users/mongoDB/user_schema');
var Validator = require('jsonschema').Validator;

class TaskDAO {

    schemaFile = '/database/tasks/tasks_schema.json';

    constructor(){
        db.conn();
    }

    /**
     * This method create a new user. If the object doesn't match
     * the schema it'll not be created and a boolean is returned.
     * It returns true if a user is created. Otherwise false.
     * @param {Object} user - A user object.
     * @returns boolean
     */
    set (user, fun){

        let list = this.getAll();
        if (!list) return false;
        for (const prop in list){
            const tempUser = list[prop].user;
            if (tempUser.id === user.id)
                return false;
        }
        list.push({user});
        
        const task = new Task(list);

        task.save()
            .then((result) => {
                console.log(result);
                fun();
            })
            .catch((err) => console.log(err));
    };


    /**
     * This function returns a user object if it's found. Otherwise null.
     * @param {number} id - ID of the user.
     * @returns Object
     */
    async getById(id) {
        return await Task.findById(id);
    };

    /**
     * This function deletes user based on an ID.
     * If user is found and removed it'll return true. Otherwise false.
     * @param {number} id - ID of the user.
     * @returns boolean
     */
    async deleteById(id, fun) {
        return await Task.findByIdAndDelete(id);
    };

    /**
     * This function updates a user. It returns true if user is found and updated. Otherwise false.
     * @param {Object} user - It's an object of user. It's expected an object that match the schema.
     * @returns boolean
     */
    update(userObject, fun) {

        const id = userObject.id;

        let list = this.getAll();
        if (!list) return false; // Returns false if list is empty or null
        for (const prop in list){
            const tempUser = list[prop].user;
            if (tempUser.id === user.id){
                list[prop].user = user;
                
                Task.findByIdAndUpdate(
                    id,
                    {user: userObject}
                )
                .then((result) => {
                    console.log(result);
                    fun();
                })
                .catch((err) => console.log(err));
            }
        }
    };

    /**
     * This function returns all objects from a file.
     * If the file content is not valid accroding to a schema,
     * then it'll return null.
     * @returns Object
     */
    async getAll(fun) {
        return await Task.find();
    };

    /**
     * This function validates a JSON data against a JSON schema
     * @param {Object} taskData - A JSON data object
     * @param {Object} taskSchema - A JSON Schema object
     */
     validateData = function (userData, userSchema) {
        let validator = new Validator();
        let result = validator.validate(userData, userSchema);
        return result.valid;
    };
}

module.exports = TaskDAO;