// ES6 

class user {
    constructor(username, email, password) {
       this.username = username;
       this.email = email;
       this.password = password; 
    }
    
    encryptPassword() {
        return `${this.password}abcd`
    }

    changeUsername(){
        return `${this.username.toUpperCase()}`
    }
}

const response = new user("satish", "satish@facebook.com", "123456789");
console.log(response.encryptPassword())
console.log(response.changeUsername())

// Behind the scene

function userOne (username, email, password){
    this.username = username;
    this.email = email;
    this.password = password; 
}
userOne.prototype.encryptPassword = function(){
    return `${this.password}abcd`
}

const response2 = new userOne("prince", "prince@fb.com", "98745");
console.log(response2.encryptPassword());