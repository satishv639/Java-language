// singleton

// object literals
const mySym = Symbol("key1")
const jsUser = {
    name: "satish",
    "full name": "satish kumar",
    age: 30,
    [mySym]: "mykey1",
    location: "mohali",
    email: "satishv639@gmail.com",
    isLoggedIn: false,
    lastLoginDays: ["monday", "saturday"]
}

// console.log(jsUser.email);
// console.log(jsUser["email"]);
// console.log(jsUser["full name"]);

// console.log(jsUser[mySym]);

jsUser.email = "satishv@google.com"
// Object.freeze(jsUser);

jsUser.email = "kumar@chat.com"
// console.log(jsUser);

jsUser.greeting = function(){
    console.log("Hello js user");
}
jsUser.greetingTwo = function(){
    console.log(`Hello js user ${this.name} and your age ${this.age}`);
}
console.log(jsUser.greeting());
console.log(jsUser.greetingTwo());