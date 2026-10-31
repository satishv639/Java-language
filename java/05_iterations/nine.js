const myNums = [1,2,3]
// const myTotal = myNums.reduce( function(accuval, currval){
//     console.log(`accumaltor: ${accuval} and current value: ${currval}`)
//     return accuval + currval
// }, 0)

// const myTotal = myNums.reduce( (acc, curval)=> acc+curval, 0)
// console.log(myTotal);

const shopingCart = [
    {
        itemName: "js course",
        price: 2999
    },
    {
        itemName: "py course",
        price: 999
    },
    {
        itemName: "Mobile dev course",
        price: 5999
    },
]
const totlPrice = shopingCart.reduce((acc, item)=> acc + item.price, 0)

console.log(totlPrice);