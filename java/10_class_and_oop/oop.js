const user = {
    username: "satish",
    loginCount: 8,
    signedIn: true,

    getUserDetails: function(){
        // console.log("Get user details from database");
        // console.log(`Username: ${this.username}`)
        // console.log(this);
    }
}
// console.log(user.username);
// console.log(user.getUserDetails());

function User(username, loginCount, loggedIn) {
    this.username = username;
    this.loginCount = loginCount;
    this.loggedIn = loggedIn;

    //return this
    this.greeting = function(){
        console.log(`Welconme ${this.username}`)
    }
}
const userOne = new User("satish", 10, true);
const userTwo = new User("akshat", 20, true);
console.log(userOne.constructor);