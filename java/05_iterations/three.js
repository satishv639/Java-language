// for of loop

// ["", "", ""]
// [{}, {}, {}]

const arr = [1, 2, 3, 4, 5]

for (const num of arr) {
    // console.log(num);
}

const greeting = "Hello World!"
for (const greet of greeting) {
    // console.log(`Each char is ${greet}`);
}

// map
const map = new Map()
map.set('IN', "India")
map.set('USA', "United State of America")
map.set('Fr', "France")


for (const [key, value] of map) {
    // console.log(key, ':-', value);
}


// In object for of loop not support
const myObject = {
    'game1':'NFS',
    'game2':'God of War',
    'game3':'spiderman'
}
for (const [key, value] of myObject) {
    // console.log(key, ":-", value);
}