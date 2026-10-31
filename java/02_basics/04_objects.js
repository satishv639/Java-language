// const tinderUser = new Object()  //singleton object

const tinderUser = {}

tinderUser.id = "123abc"
tinderUser.name = "sam"
tinderUser.isLoggedIn = false

// console.log(tinderUser)

const regularUser = {
    email: "sartaj@gmail.com",
    fullname: {
        userfullname: {
            firstname: "sartaj",
            lastname: "singh"
        }
    }
}
// console.log(regularUser.fullname?.userfullname.firstname)

const obj1 = {1: "a", 2:"b", 3: "c"}
const obj2 = {4: "d", 5:"e", 6: "f"}
const obj3 = {7: "g", 8:"h", 9: "i"}

// const obj4 = {obj1, obj2, obj3}
// const obj4 = Object.assign({}, obj1, obj2, obj3)
// const obj4 = {...obj1, ...obj2, ...obj3}
// console.log(obj4)

const user = [
    {
        id: 1,
        email: "ak@gmail.com"
    },
    {
        id: 1,
        email: "gk@gmail.com"
    },
    {
        id: 1,
        email: "ck@gmail.com"
    },
]
user[2].email;

//  console.log(tinderUser)
//  console.log(Object.keys(tinderUser));
//  console.log(Object.values(tinderUser));
//  console.log(Object.entries(tinderUser))

//  console.log(tinderUser.hasOwnProperty('name'))

const course = {
    coursename: "js in hindi",
    price: "999",
    courseInstructor: "hitesh"
}
// course.courseInstructor
// console.log(course.courseInstructor);
const {courseInstructor: instructor} = course

console.log(instructor);