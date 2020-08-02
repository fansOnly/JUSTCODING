
// 元素比较
// [] == ![]
// ![]  = false  => [] == false
// false = 0 => [] == 0
// ToPrimitive([]) => [].toString() => '' == 0
// toNumber('') => 0 == 0
// return true

// {} == !{}
// !{} = false => {} == false
// false = 0 > {} == 0
// ToPrimitive({}) => {}.toString() => error
// return false
// ************************************************************************************************************************


const a = { b: 3 }

function foo(obj) {
    console.log(a === obj) // true
    obj.b = 5
    return obj
}

var aa = foo(a)

console.log(aa.b) // 5

console.log(a.b) // 5

// *********************************************************************************************************


function Ofo() { }

function Bike() {
    this.name = 'mybike'
}

var myBike = new Ofo()

Ofo.prototype = new Bike()

console.log(Ofo) // [F: Ofo]
console.log(myBike) // Ofo {}

console.log(myBike.name) // undefined

var yourBike = new Bike()

console.log(yourBike.name) // mybike

// *********************************************************************************************************

