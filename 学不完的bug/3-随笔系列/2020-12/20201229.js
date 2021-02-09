
function bar(a, b, c) {
    c = 10
    return a + b + c
}

console.log(bar(1,1,1)) // 12

// var x = [].reverse
// console.log(x())  // window ???

{
    (function() {
        var x = y = 1
    })();
    
    console.log(y) // 1
    // console.log(x) // x is not defined
}

function f() {}
var a = f.prototype
console.log('a: ', a);
var b = Object.getPrototypeOf(f)
console.log('b: ', b);
console.log(b.name) // [empty string]
console.log(f.__proto__)


console.log(new Date('x')) // Invalid Date
console.log(Date(0))
console.log(typeof Date(0)) // string
console.log(new Date(0))
console.log(typeof new Date(0)) // object

console.log(Math.min()) // Infinity
console.log(Math.max()) // -Infinity


console.log(Function.length) // 1
console.log(new Function().length) // 0



var a = new Date("2014-03-19");
var b = new Date(2014, 03, 19);
console.log(a)
console.log(b)


function foo(a, b) {
    var a
    var b = 5
    return [a, b]
}

console.log(foo(1, 3))
