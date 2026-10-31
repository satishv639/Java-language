// Immediately Invoked Function Expression (IIFE)

(function chai(){
    // Name IIFE
    console.log(`DB CONNECTION`);
})();

( (name) =>{
    // Un-named IIFE with arrow function
    console.log(`DB CONEECTION TWO ${name}`)
})('satish')
