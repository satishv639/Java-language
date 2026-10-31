const user = {
    username: "satish",
    price: 999,

    welcomeMessage: function() {
        console.log(`${this.username}, Welcome to website`)
        // console.log(this);
    }
}
// user.welcomeMessage()
// user.username = "sameer"
// user.welcomeMessage()
// console.log(this);

// function chai(){
//     let username = "satish"
//     console.log(this.username);
// }
// chai()

// const chai = () => {
//     let username = "satish"
//     console.log(this);
// }
// chai()

// ++++++ Arrow functions +++++++

// const addThree = (num1, num2) => {
//     return num1 + num2
// }
// console.log(addThree(10, 15));

//  implicit return

// const addThree = (num1, num2) =>  num1 + num2
// const addThree = (num1, num2) =>  (num1 + num2)

const addThree = (num1, num2) =>  ({username: "simaran"})
console.log(addThree(20, 15));