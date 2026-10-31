const name = "satish";
const repoCount = 50;

// concrete method old 
// console.log(name + repoCount);


// ++++ string interpolation method ++++
console.log(`Hello my name is ${name}, and my repo cunt is ${repoCount}`);

// String define another method and used the functions

const gameName = "satish-kv";

console.log(gameName[5]);
console.log(gameName.__proto__);

// console.log(gameName.length);
// console.log(gameName.toUpperCase());

console.log(gameName.charAt(3));
console.log(gameName.indexOf("h"));

const newString = gameName.substring(0, 4);
console.log(newString);

const anotherString = gameName.slice(-8, 4);
console.log(anotherString);

const newStringOne = "   satish   ";
console.log(newStringOne);
console.log(newStringOne.trim());

const url = "http://satish.com/satish%20kumar"

console.log(url.replace('%20', '-'));
