// data type is two type 1) primitive and 2) non-primitive
// Primitive (call by value)
// 7 type: string, number, boolean, null, undefined, symbol, BigInt

const score = "100";
const scoreValue = 100.3;
const isLoggedIn = false;
const outsideTemp = null;
let userEmail;

const id = Symbol('1234');
const anotherId = Symbol('1234');

// console.log(id === anotherId);

const bigNumber = 123146446846548n


// Non Primitive (call by refrence)

// 3 type: array, objects, function

const heros = ["shaktimaan", "naagraaz", "junior G"];

let myObj = {
    name: "satish",
    email: "satishv639@gmail.com"
}

const myFunction = function(){
    console.log("hello my function");
}

// console.log(typeof anotherId);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Stack, heap memory

// ++++++ Stack Memory ++++++ used in Primitive (call by value)
let myYoutubename = "satish.com";

let anotherYoutubename = myYoutubename;
 anotherYoutubename = "Pubg";

 console.log(myYoutubename);
 console.log(anotherYoutubename);

//  +++++++ Heap Memory ++++++ used in Non Primitive (call by refrence)

let userOne = {
    name: "satish",
    email: "satishv639@gmail.com",
}

let userTwo = userOne;
userTwo.email = "satish.verma@yahoo.com";

console.log(userOne.email);
console.log(userTwo.email);