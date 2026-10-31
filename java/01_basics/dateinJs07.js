// Dates 

let myDate = new Date();
// console.log(myDate);
// console.log(myDate.toString());
// console.log(myDate.toDateString());
// console.log(myDate.toISOString());
// console.log(myDate.toLocaleDateString());
// console.log(myDate.toLocaleTimeString());
// console.log(myDate.toLocaleString());

// let myCreatedDate = new Date(2026, 0, 16);
// console.log(myCreatedDate.toDateString());
// let myCreatedDate1 = new Date(2026, 0, 16, 5, 59);
// console.log(myCreatedDate1.toLocaleString());

// let myCreatedDate1 = new Date("2026-01-20");
// console.log(myCreatedDate1.toLocaleString());

let myCreatedDate = new Date("01-14-2026");
// console.log(myCreatedDate.toLocaleString());

// let myTimeStamp = Date.now()

// console.log(myTimeStamp);
// console.log(myCreatedDate.getTime());
// console.log(Date.now() / 1000);
// console.log(Math.floor(Date.now() / 1000));

let newDate = new Date()
console.log(newDate);
console.log(newDate.getDate() + 1);
console.log(newDate.getDay());

newDate.toLocaleString('default', {
    weekday: "long",
    timeZone: "",
});