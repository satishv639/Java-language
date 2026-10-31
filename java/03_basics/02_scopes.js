var c = 300
let a = 400
if(true){
    let a = 20
    const b = 40
    // console.log("Inner:", a)
}
// console.log(a)

// Nested scope

function one(){
    const username = "satish"

    function two(){
        const website = "youtube"
        console.log(username);
    }
    // console.log(website);

    two()
}

// one()

if(true){
    const username = "satish"
    if(username === "satish"){
        const website = " youtube"
        // console.log(username + website);
    }
    // console.log(website);
}
// console.log(username);

// ++++++++++++ interesting +++++++++++++
console.log(addone(5));
function addone(num){
    return num + 1
}

const addTwo = function(num){
    return num +2
}
console.log(addTwo(8));