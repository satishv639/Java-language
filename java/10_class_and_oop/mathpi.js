// console.log(Math.PI);
// Math.PI = 5
// console.log(Math.PI)

// const descriptor = Object.getOwnPropertyDescriptor(Math, "PI")
// console.log(descriptor);

// const myNewObject = Object.create(null);

const tea = {
    name: "tata",
    price: 15,
    isAvailable: true,

    orderTea: function(){
        console.log("code fatt gya")
    }
}
// console.log(Object.getOwnPropertyDescriptor(tea, "name"))

Object.defineProperty(tea, "name", {
    // writable: false,
    enumerable: true
})
console.log(Object.getOwnPropertyDescriptor(tea, "name"))

for (let [key, value] of Object.entries(tea)) {
    if (typeof value !== "function") {
        console.log(`${key} : ${value}`);
    }
    
}