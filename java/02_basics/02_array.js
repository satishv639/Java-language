const marvelHero = ["ironman", "thor", "spiderman", "black panther"]
const dcHero = ["superman", "batman", "woder women", "flash"]

// marvelHero.push(dcHero);

// console.log(marvelHero);
// console.log(marvelHero[4][1])

// const allmarvelHero = marvelHero.concat(dcHero)
// console.log(allmarvelHero);

// const allNewHero = [...marvelHero, ...dcHero]
// console.log(allNewHero)

// const anotherArray = [1, 2, 3, [4, 5, 6], 7, [6, 7, [8, 9]]]

// const realAnotherArray = anotherArray.flat(Infinity);
// console.log(realAnotherArray);

console.log(Array.isArray("satish"));  
console.log(Array.from("akshat"));
console.log(Array.from({name: "john"})); // intersting 

let score1 = 1000
let score2 = 2000
let score3 = 3000

console.log(Array.of(score1, score2, score3));