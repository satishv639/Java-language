// const promiseOne = new Promise( function(resolve, reject){
//     // Do an asyn task
//     // DB calls, cryptography, netwrok
//     setTimeout( function(){
//         console.log("Async task is complete");
//         resolve();
//     }, 1000)
// })
// promiseOne.then(function(){
//     console.log("Promise consumed");
// });

// new Promise(function(resolve, reject){
//     setTimeout(function(){
//         console.log("Asyn task 2");
//         resolve();
//     }, 1000)
// }).then(function(){
//     console.log("Async 2 resolved");
// })

// const promiseThree = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         resolve({username: "satish", email: "satishv639@gmail.com"});
//     }, 1000)
// }).then(function(user){
//     console.log(user);
// })

// const promiseFour = new Promise(function(reslove, reject){
//     let error = true;
//     if (!error) {
//         setTimeout(function(){
//             reslove({username:"akshat", password:"123456789"})
//         }, 1000)
//     }else{
//         reject("ERROR: Something went wrong")
//     }
    
// })
// promiseFour.then((user)=>{
//     console.log(user);
//     return user.username
// }).then((username)=>{
//     console.log(username);
// }).catch((error)=>{
//     console.log(error);
// }).finally(()=> console.log("The promises is either resolved or reject "));

// const promiseFive = new Promise(function(reslove, reject){
//     setTimeout( function(){
//         let error = true;
//         if (!error) {
//             reslove({username: "javascript", password:"123456"});
//         }else{
//             reject("ERROR: JS went wrong");
//         }
//     }, 1000)
// })

// async function consumePromiseFive() {
//     // const response = await promiseFive
//     // console.log(response);
//     try {
//         const response = await promiseFive
//         console.log(response);
//     } catch (error) {
//         console.log(error)
//     }
// }
// consumePromiseFive();

// async function getAllUsers() {
//     try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users");
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.log("ERROR:", error);
//     }
    
// }
// getAllUsers()

fetch("https://jsonplaceholder.typicode.com/users")
.then((response)=>{
    return response.json();
})
.then((data)=>{
    console.log(data)
})
.catch((error) => console.log(error))
