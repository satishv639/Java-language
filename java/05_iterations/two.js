// While loop

let index = 0
// while (index <= 10) {
//     // console.log(`Value of index is ${index}`);
//     index = index + 2
// }

let myArray = ["flash", "batman", "superman"]
let arr = 0
while (arr <= myArray.length) {
    // console.log(`Value is ${myArray[arr]}`);
    arr = arr + 1
}

// Do while loop
let score = 1
do {
    // console.log(`Score value is ${score}`);
    score++
} while (score <= 5);

// let star = ""
// for (let index = 1; index <= 5; index++) {
//     star +="*";
//     console.log(star);
// }

for (let i = 5; i >= 1; i--) {
    let star = ""
    for (let j = 1; j <= i; j++) {
         star += "*"
        
    }
    console.log(star);
}
