console.log([...new Array(10).keys()])


console.log([...Array(10)].map((v, i) => i))

console.log(Array.of(3))

console.log(Array(3))


function Parent(name) {
    this.name = name
    return 1
    // return {
    //     a: 1
    // }
}

var p = new Parent('p')

console.log(p)

console.log([1,2,3].toString())


var arr = [1,2,3]
arr.join = arr.shift

console.log(arr)
console.log(arr == 1)
// console.log(arr == 1 && arr == 2 && arr == 3)
