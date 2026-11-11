class user {
    constructor(username){
        this.username = username;
    }
     logMe(){
        console.log(`Username is ${this.username}`)
     }
}

class teacher extends user {
    constructor(username, email, password){
        super(username);
        this.email = email;
        this.password = password;
    }

    addCourse(){
        console.log(`A new course is added ${this.username}`);
    }
}

const response = new teacher("john", "john@gmail.com", "95684");
// console.log(response.logMe())
response.addCourse();

const response2 = new user("Pritam");
response2.logMe();

console.log(response instanceof teacher);