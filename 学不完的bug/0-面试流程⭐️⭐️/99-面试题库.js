
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

// 手写Promise⭐️⭐️⭐️⭐️⭐️

// var Promise = function (executor) {
//     this.state = ''
//     this.value = ''
//     this.reason = ''
//     this.handled = false;
//     this.onFulfilledFn = [];
//     this.onRejectedFn = [];
//     const resolve = value => {}
//     const reject = reason => {}
//     try {
//         executor(resolve, reject)
//     } catch (error) {
//         reject(error)
//     }
// }
// Promise.prototype.then = function (onFulfilled, onRejected) {}
// Promise.prototype.catch = function (onRejected) {}
// Promise.prototype.finally = function (onFinally) {}


// 链式调用
// 1. 每个then方法都返回一个新的Promise对象（原理的核心）
// 2. 如果then方法中显示地返回了一个Promise对象就以此对象为准，返回它的结果
// 3. 如果then方法中返回的是一个普通值（如Number、String等）就使用此值包装成一个新的Promise对象返回
// 4. 如果then方法中没有return语句，就视为返回一个用Undefined包装的Promise对象
// 5. 若then方法中出现异常，则调用失败态方法（reject）跳转到下一个then的onRejected
// 6. 如果then方法没有传入任何回调，则继续向下传递（值的传递特性）
/**
 * 解析then返回的值与新的Promise对象
 * @param {Object} promise2 新的Promise对象
 * @param {*} x then的返回值
 * @param {Function} resolve resolve(promise2)
 * @param {Function} reject reject(promise2)
 */
// function resolvePromise(promise2, x, resolve, reject) {}
