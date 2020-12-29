class User {

    constructor() {
        const datetime = new Date().valueOf();
        this.id = datetime.toString();
        this.name = "";
        this.email = "";
        this.password = "";
    }

    setId(id){
        this.id = id; 
        return this;
    }

    setName(name){
        this.name = name; 
        return this;
    }

    setEmail(email){
        this.email = email; 
        return this;
    }

    setPassword(password){
        this.password = password; 
        return this;
    }
};

module.exports = User;