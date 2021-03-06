// pointer-events：解决点击穿透，css3


// =======================================================================================================
// ============================================= 函数篇 ==================================================
// =======================================================================================================

// 1 函数声明方式
// a 函数表达式
function fn1() {}

// b 作为对象的方法声明
var obj1 = {
    name: 'obj1',
    say: function() {
        return this.name
    }
}
obj1.say(); // obj1

// c 作为构造函数, 通过 new 关键字声明
function Fn() {}
var fn3 = new Fn();

// d 被 apply call 调用
var obj4 = {
    sum: 0
}
function add() {
    let sum = 0
    sum =  Array.prototype.slice.call(arguments).reduce((prev, cur) => prev + cur, 0)
    this.sum = sum
}
console.log(obj4.sum) // 0

add.call(obj4, 1, 2, 3)
console.log(obj4.sum) // 6

add.apply(obj4, [1, 2, 3, 4])
console.log(obj4.sum) // 10


// 2 函数声明会被提升, 函数表达式不会

// 3 arguments 对象是什么
// a 类数组对象, 拥有 length 属性, 可以使用下标访问元素
// b 不具有数组的内置方法, 可以通过数组原型来调用内置方法
// c 通过 Array.prototype.slice.call(arguments) 转化为数组



// =======================================================================================================
// ============================================= 对象篇 ==================================================
// =======================================================================================================

// 1 js 创建对象的方法

// a 对象字面量 var obj = {};
// b 构造函数 fucntion F() {} var obj = new F();
// c Object.create() var obj = Object.create(null)


// 2 es5: Object.freeze VS Object.seal

// a Object.freeze: 冻结一个对象, 不能被修改; 该对象的原型也不能被修改
// b Object.seal: 封闭一个对象, 当前属性变为不可配置, 不能添加/删除属性; 对象的可写属性可以修改


// 3 in VS Object.hasOwnProperty

// a in: 返回布尔值, 从对象及其原型链读取属性
// b Object.hasOwnProperty: 返回布尔值, 只从对象自身读取属性


// 4 对象结构
// a 快速, 简洁的声明/获取对象属性
// b 属性别名设置
const obj2 = {
    a: 1,
    b: 2
}
const { a: a1, b } = obj2
// a // a is not defined
a1 // 1
// c 属性默认值设置
const { c = 3, d } = obj2
c // 3
d // undefined



// =======================================================================================================
// ============================================= Ajax篇 ==================================================
// =======================================================================================================

// 1 Ajax 是什么

// a 异步的 Javascript 和 XML, 创建快速动态网页的技术
// b HTML, CSS, Javascript, XMLHttpRequest API, node.js php java 等服务端语言


// =======================================================================================================
// ============================================= 提升篇 ==================================================
// =======================================================================================================

// 1 基本类型的包装对象


// 2 展开运算符和剩余运算符
// a ...spead: 多用于函数传参, 将一个数组转化为用逗号分隔的参数序列
// b ...Rest: 多用于数组结构和对象结构, 是为了收集剩余的元素并组装起来


// 3 async/await
// a 使用 async 声明一个函数后会隐式的返回一个 Promise
const f1 = async num => {
    return num
}

console.log(f1())
f1(1).then(res => {
    console.log(res)
})


// 5 模块化

// a CommonJs - Node.js
// b AMD - 浏览器
// c es6 模块

// 模块导出多个
// commonjs
// exports.fn = function() {}

// es6
// export function fn() {}

// 模块引入多个
// commonjs
// const fn = require('')
// const f1 = fn.f1
// const { f1, f2, f3 } = require('')

// es6
// import * as fn from ''
// import { f1, f2, f3 as f33 } from ''

// 模块多出单个
// commonjs
// module.exports = function() {}

// es6
// export default {}

// 模块到处单个
// commonjs
// const fn = require('')

// es6
// import fn from ''





// 8 赋值运算符是从右到左求值的 ⭐
// b 被提升为全局变量
function fn2() {
    let a = b = 0 // let a = (b = 0)
}
b // 0
// a // a is not defined

// 9 
