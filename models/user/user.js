/**
 * Class User abstracts simple characteristcs of a user account.
 * @author Raul Macedo Fuzita
 * @version 1.0.0
 */
class User {

    constructor() {
        // Data time is used to create a unique ID
        const datetime = new Date().valueOf();
        this.id = datetime.toString();
        this.name = "";
        this.email = "";
        this.password = "";
    }

    /**
     * This method sets an ID to the user. This method is chainable
     * @param {number} id - This is the user ID.
     * @returns User
     */
    setId(id){
        this.id = id; 
        return this;
    }

    /**
     * This method sets a name to the user. This method is chainable
     * @param {string} name - This is the user name.
     * @returns User
     */
    setName(name){
        this.name = name; 
        return this;
    }

    /**
     * This method sets a email to the user. This method is chainable
     * @param {string} email - This is the user email.
     * @returns User
     */
    setEmail(email){
        this.email = email; 
        return this;
    }

    /**
     * This method sets a password to the user. This method is chainable.
     * @param {string} password - This is the user password. Password type is string to support sha256
     * @returns User
     */
    setPassword(password){
        this.password = password; 
        return this;
    }
};

module.exports = User;