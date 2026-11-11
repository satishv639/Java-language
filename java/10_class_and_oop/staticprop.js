class user {
    constructor(username){
        this.username = username;
    }
    logMe(){
        console.log(`UserName: ${this.username}`);
    }
    // when add static property then createId method not share other instance like (teacher)
    static createId(){
        return Math.floor(Math.random() * 5 + 2);
    }
}
const result = new user("satish");
// console.log(result.createId());

class teacher extends user {
    constructor(username, email){
        super(username);
        this.email = email;
    }
}

const result2 = new teacher("ramesh", "ramesh@fb.com");
console.log(result2.createId());