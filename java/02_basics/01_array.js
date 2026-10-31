// Array

const myArry = [0, 1, 2, 3, 4, 5]
const myHero = ["Iron man", "spiderman", "superman"]

const myArray2 = new Array(1, 2, 3, 4)
// console.log(myArry[1]);

// Array Methods

// myArry.push(6)
// myArry.pop()

// myArry.unshift(9)
// myArry.shift()

// console.log(myArry.includes(10));
// console.log(myArry.indexOf(1));

// const newArry = myArry.join()
// console.log(myArry);
// console.log(newArry);

// slice, splice

console.log("A", myArry);
const myn1 = myArry.slice(1, 3);
console.log(myn1);
console.log("B", myArry);

const myn2 = myArry.splice(1, 3);
console.log("c", myArry);
console.log(myn2);
