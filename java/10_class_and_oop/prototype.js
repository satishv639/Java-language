// let myName = "saish    ";
// let myChannel = "chai or code";

// console.log(myName.trueLength);
// console.log(myName.trim().length);

let myHero = ["thor", "spierman", "hulk"]
let heroPower = {
    thor: "hammer",
    spiderman:"sling",
    hulk:"strong",

    getSpiderPower : function(){
        console.log(`Spider man power is ${this.spiderman}`);
    }
}
 // inject the custom method in object

//  Object.prototype.satish = function(){
//     console.log(`Satish method present in all object`);
//  }
// heroPower.satish();
// myHero.satish();

 //inject the custom method only array
 Array.prototype.satish = function(){
    console.log(`Satish method present only array `)
 }
// myHero.satish();
// heroPower.satish();

// inheritance
const user ={
    user: "satish",
    email: "satish@gmail.com"
}
const teacher = {
    makeVideo: true
}
const teacherSupport = {
    isAvailable: false
}
const taSupport = {
    makeAsssignment: "JS assignment",
    fullTime: true,
    __proto__: teacher
}
// Old syntax 
teacher.__proto__ = user

// mordern syntax

Object.setPrototypeOf(teacherSupport, teacher);

let anotherUserName = "Akshat   ";
String.prototype.trueLength = function(){
    console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`)
}

anotherUserName.trueLength();

"Prince of persia".trueLength();