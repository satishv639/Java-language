function saveMyName() {
console.log("S");
console.log("A");
console.log("T");
console.log("I");
console.log("S");
console.log("H");
}
// saveMyName();

// function addTwoNumber(number1, number2){
//     console.log(number1 + number2);
// }
// addTwoNumber(5, 6);
// addTwoNumber(5, "a");

function addTwoNumber(number1, number2){
    // let result = number1 + number2
    // return result
    return number1 + number2
}
const result = addTwoNumber(12, 25)
// console.log("Result:", result);

function loginUserMessage(username){
     if(!username){
        console.log("Please enter a username")
        return
    }
    // if(username === undefined){
    //     console.log("Please enter a username")
    //     return
    // }
    return `${username} just logged in`
}
// console.log(loginUserMessage());

// +++++++++++++++ rest operater +++++++++++++++++

// function calculateCartPrice(...num1){
//     return num1
// }
// console.log(calculateCartPrice(200, 300, 400, 500));

function calculateCartPrice(val1, val2, ...num1){
    return num1
}
// console.log(calculateCartPrice(200, 300, 400, 500));

const user = {
    username: "Satish",
    prices: 299
}

function handleObject(anyobject) {
    console.log(`Username is ${anyobject.username} and price is ${anyobject.price}`);
}

// handleObject(user);
// direct object pass

handleObject({
    username: "akshat",
    price: 399
})

// array pass

const myNewArray =[200, 300, 400]

function returnSecondValue(getArray){
    return getArray[1]
}
// console.log(returnSecondValue(myNewArray));
console.log(returnSecondValue([200, 400, 500, 600]));