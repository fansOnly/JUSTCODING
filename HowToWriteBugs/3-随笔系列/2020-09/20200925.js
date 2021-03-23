/**
 * 第三作用域：es6函数默认参数形成的‘作用域’
 */

let y = 1
function fn(x = function() {return y + 1}, y = 2) {
    console.log(x()) // 3
    var y = 1  // if use let , throw error: y is already delared
    console.log(y) // 1
    console.log(x()) // 3
}

fn()



/**
 * 函数表达式中的函数名不可被覆盖
 */

const c = function CC() {
    CC = 123
    return CC
}
console.log(c())  // Function

// 用var声明覆盖
const b = function BB() {
    var BB = 123
    return BB
}
console.log(b()) // 123




/**
 * arguments 和形参
 */

function test(a, b) {
    console.log(a, b) // 1 2
    arguments[0] = 100
    arguments[1] = 200
    console.log(a, b) // 100 200
}

test(1, 2)
