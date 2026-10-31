// forech loop not return loop

// const coding =["js", "ruby", "java", "cpp", "python"]

// const value = coding.forEach((item)=>{
//     console.log(item);
//     return item
// })
// console.log(value);

// filter are return value

// const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const newNums = myNums.filter((num)=> num > 5 )
// const newNums = myNums.filter((item)=>{
//     return item > 4
// })

// const newNums =[]
// myNums.forEach((item)=>{
//     if(item > 4){
//         newNums.push(item)
//     }
// })
// console.log(newNums);

const books = [
    { title: "Book One",  genre: "Fiction", pubish: 1981, editon: 2004 },
    { title: "Book Two",  genre: "No-Fiction", pubish: 1992, editon: 2008 },
    { title: "Book Three",  genre: "History", pubish: 1981, editon: 2004 },
    { title: "Book Four",  genre: "No-Fiction", pubish: 1999, editon: 2007 },
    { title: "Book Five",  genre: "Science", pubish: 1989, editon: 2012 },
    { title: "Book Six",  genre: "Fiction", pubish: 1987, editon: 2010 },
    { title: "Book Seven",  genre: "History", pubish: 1986, editon: 1996 },
    { title: "Book Eight",  genre: "Fiction", pubish: 2011, editon: 2015 },
]

const userBooks = books.filter((bk)=> bk.genre === "Fiction" )
console.log(userBooks);
const userBookPub = books.filter((bk)=> {
    return bk.pubish >= 2000 && bk.genre === "Fiction"}
)

console.log(userBookPub);