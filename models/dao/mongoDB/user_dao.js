const User = require('../../../database/users/mongoDB/user_schema')
class UserDAO {

    /**
     * This method create a new user. If the object doesn't match
     * the schema it'll not be created and a boolean is returned.
     * It returns true if a user is created. Otherwise false.
     * @param {Object} user - A user object.
     * @returns boolean
     */
    async set (userObject){
        const user = new User(userObject)
        await user.save()
    }

    /**
     * This function returns a user object if it's found. Otherwise null.
     * @param {number} id - ID of the user.
     * @returns Object
     */
    async getById(id) {
        return await User.findById(id)
    }

    /**
     * This function returns a user object if it's found. Otherwise null.
     * @param {String} email - ID of the user.
     * @returns Object
     */
    async getByEmail(userEmail) {
        return await User.findOne({email: userEmail})
    }

     /**
     * This function deletes user based on an ID.
     * If user is found and removed it'll return true. Otherwise false.
     * @param {number} id - ID of the user.
     * @returns boolean
     */
    async deleteById(id) {
        return await User.findByIdAndDelete(id)
    }

    /**
     * This function updates a user. It returns true if user is found and updated. Otherwise false.
     * @param {Object} user - It's an object of user. It's expected an object that match the schema.
     * @returns Object
     */
    async update(userObject) {

        const id = userObject.id

        return await User.findByIdAndUpdate(
            id,
            {user: userObject}
        )
    }

    /**
     * This function returns all objects from a file.
     * If the file content is not valid accroding to a schema,
     * then it'll return null.
     * @returns Object
     */
    async getAll() {
        return await User.find()
    }
}

module.exports = UserDAO;