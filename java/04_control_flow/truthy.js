const userEmail = []

if(userEmail){
    console.log("Got the user email");
} else{
    console("Don't have user email");
}

// if(userEmail.length === 0){
//     console.log("Array is empty");
// }

// falsy value
// false, 0, -0, BigInt 0n, "", null, undefined, NaN

// truthly value
// "0", 'false', " ", [], {}, function(){}

const empyObj = {}
if(Object.keys(empyObj).length === 0){
    console.log("Object is empty");
}

// Nullish Coalescing oerator (??): null undefined

let val1;
// val1 = 4 ?? 10
// val1 = null ?? 10
// val1 = undefined ?? 15
val1 = null ?? 10 ?? 18

console.log(val1)

// Terniary Operator
// condition ? true : false

const iceTeaPrice = 150
iceTeaPrice <= 80 ? console.log("less than 80") : console.log("More than 80");