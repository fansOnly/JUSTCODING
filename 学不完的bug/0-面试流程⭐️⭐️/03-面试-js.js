// 作用域
// 1、全局作用域  window.xx
// 2、函数作用域  function() {...}
// 3、块级作用域  {...}

// 作用域链: 内部作用域 => 外部作用域 => 全局作用域

// ************************************************************************************************************************

// 变量提升： 将函数或者变量提升到作用域顶部的术语

// 执行上下文：
// 1、编译   定义变量和函数
// 2、执行  执行函数、变量赋值等

// ************************************************************************************************************************
// 原型链⭐️⭐️⭐️

// 原型、构造函数、实例、原型链的关系如何？
// 原型的constructor指向构造函数，构造函数的prototype指向原型
// 实例的__proto__指向原型
// new 构造函数创建实例
// 原型的__proto__指向原型对象 -> 原型链的尽头是null

// 1 javascript中的继承是通过原型链来体现的
// 2 每个对象都有一个__proto__属性，指向构造函数的prototype
// 3 访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链
// ps 我们可以通过hasOwnProperty方法来判断一个属性是否从原型链中继承而来


// es5继承
// 1 原型继承: 父构造 + 子构造 + (子原型 = new 父构造) - 子实例属性引用相同，相互影响
// 2 构造函数继承: 父构造 + 子构造 + 父构造.call - 只继承显式属性，不继承原型链
// 3 组合继承: 父构造 + 子构造 + 父构造.call + (子原型 = new 父构造) - 两次父构造
// 3.1 组合继承优化： 父构造 + 子构造 + 父构造.call + (子原型 = Object.create(父原型)) + 子构造 = 自身
// 4 寄生继承: 父构造 + 继承方法(Object.create(父原型))
// 4.1 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象
// 5 组合寄生继承: - 父构造 + 子构造 + 继承方法(Object.create(父原型)) + (子原型 = new 父构造)
// 5.1 通过借用构造函数来继承属性，通过原型链的混成形式来继承方法


// es6继承
// class extend super


// call/apply: 改变对象的上下文，立即执行
// bind: 改变对象的上下文，需要手动执行


// new 的流程⭐️
// 1 创建一个新对象，将原型指向传入的构造函数
// 2 将构造函数的this指向新创建的对象
// 3 如果构造函数有返回, 则直接返回
// 4 如果构造函数没有返回, 则返回创建的对象
function newFn(fn, args) {
    const obj = Object.create(fn.prototype)
    const res = fn.apply(obj, args)
    return typeof res === 'object' && res !== null ? res : obj
}

function newFn2() {
    const Con = Array.prototype.shift.call(arguments)
    const res = Object.create(null)
    res.__proto__ = Con.prototype
    Con.call(obj, ...arguments)
    return res
}


// create的流程⭐️
// 1 创建一个函数
// 2 将函数的原型指向当前继承的原型
// 3 返回新的对象
function createFn(proto) {
    function F() { }
    F.prototype = proto
    return new F()
}

function createFn2(proto) {
    var o = {}
    o.__proto__ = proto
    return o
}

// 实现 apply⭐️
// 1 context存在则为context，不存在则为window
// 2 将context[fn]指向this
// 3 执行context[fn]()得到返回结果
// 4 删除context[fn]
// 5 返回结果
Function.prototype.myApply = function (context, args) {
    let fn = Symbol('fn')
    context = context || window
    context[fn] = this
    const res = context[fn](args)
    delete context[fn]
    return res
}

// 实现 call⭐️
Function.prototype.myCall = function (context, ...args) {
    let fn = Symbol('fn')
    context = context || window
    context[fn] = this
    const res = context[fn](...args)
    delete context[fn]
    return res
}

// 实现 bind⭐️
// 1 改变目标函数this的指向
// 2 如果新函数作为构造函数，则忽略该值
Function.prototype.myBind = function (context, ...args) {
    let that = this
    function noop() { }
    var fBound = function (...args2) {
        return that.apply(this instanceof noop ? this : context, args.concat(args2))
    }
    if (this.prototype) {
        noop.prototype = this.prototype
    }
    fBound.prototype = new noop()
    return fBound
}
function myBind() {
    var self = this
    var fn = Array.prototype.shift.call(arguments)
    var args = Array.prototype.slice.call(arguments)
    return function () {
        self.apply(fn, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)))
    }
}
// example
const Bar = function() {
    console.log(this, this.name, arguments)
}
Bar.prototype.name = 'bar'
const bound = Bar.myBind({ name: 'foo'}, 22, 33)
new bound() // fBound {},bar, [22, 23]
bound() // {name: 'foo'} ,foo, [22, 23]



// instanceof
function myInstanceof(L, R) {
    if (L === null) return false
    let proto = R.prototype
    while (L.__proto__) {
        if (L.__proto__ === proto) return true
        L = L.__proto__
    }
    return false
}

// ************************************************ 闭包⭐️⭐️⭐️ *************************************************************

// 函数内部访问父级函数作用域变量的一种实现方式
// 常用于返回一个函数
// 闭包可能导致内存泄漏

// 柯里化 - 收集剩余参数
// 偏函数
// 反柯里化

// ************************************************ JS运行机制 ⭐️⭐️⭐️ ********************************************************

// 单线程
// 任务队列
// 事件循环EventLoop⭐️⭐️⭐️
// 异步队列的机制和时机

// ************************************************************************************************************************

// 防抖和节流⭐️
// 防抖 - 在短时间内多次触发同一实践，限制只执行一次
// resize/scroll

// 节流 - 类似阀门管制一样，阀门会定期开放，函数执行一次之后，在一个时间段内会失效关闭，过了时间则会重新激活开启
// input输入框
// 拖拽

// ************************************************************************************************************************

// js对象 - 引用类型 [object Object]

// 对象属性 - obj[prop]
// 对象方法 - obj.fn()

// var obj = {} - 对象字面量
// var obj = new Object() - 实例化
// var obj = Object.create(null) - 原型继承
// var obj = new Fn() - 构造函数
// function Fn(prop){ Fn.prototype.prop = prop } var obj = new Fn(prop) - 原型声明



// js函数 - 引用类型 - [object Function]
// 本质上是一段可以被调用任意次数的js代码

// 函数传参
// 形参 - 定义函数时的参数
// 实参 - 调用函数时的参数

// 函数调用
// function fn() {} - 函数声明 - 函数提升
// var fn = function() {} - 函数表达式1.无函数名
// var fn = function f() {} - 函数表达式2.有函数名 - 函数名 f 只能在函数内部访问
// var obj = {fn: function(){}} obj.fn() - 对象方法
// var fn = new Function() - 函数构造器
// var fn = (function() {})() - 匿名自执行函数1
// var fn = (function() {}()) - 匿名自执行函数2
// var fn = (function f() {})() - 具名自执行函数1
// var fn = (function f() {}()) - 具名自执行函数2
// var fn = () => {} - 箭头函数

// ************************************************ 浏览器存储⭐️⭐️ ***********************************************************

// localStorage sessionStorage
// 保存在浏览器端, 同源
// localStorage sessionStorage 不参与服务端通信 大小 5M
// 生命周期：localStorage 永久保存, sessionStorage 保存在当前回话， 均可手动清除
// 作用域：不同浏览器不共享localStorage 和 sessionStorage, 不同会话不共享 sessionStorage

// Cookie：存储在硬盘, 过期前一直有效, 存在安全问题, 4K大小，数量也有限制, 20个左右

// *********************************************** es6特性 ⭐️⭐️⭐️ **********************************************************

// 7-1 箭头函数
// 7-2 类
// 7-3 let const
// 7-4 解构赋值
// 7-5 函数默认参数
// 7-6 展开式运算符和剩余运算符
// 7-7 模板字符串
// 7-8 Set
// 7-9 代理 Proxy
// 7-10 Promise
// 7-11 生成器
// 7-12 加强的对象字面量: 函数方法的声明优化
// 7-13 Symbol
// 7-14 块级作用域
// 7-15 模块

// *************************************************** 箭头函数 ************************************************************

// 1 没有this
// 2 不能使用new构造函数
// 3 不绑定arguments, 使用 ...rest 参数
// 4 不能使用call() 和 apply()
// 5 没有原型属性
// 6 不能简单返回对象字面量
// 7 不能当作Generator函数, 不能使用yield关键字

// *************************************************** Promise⭐️⭐️⭐️ ******************************************************

// 1 三种状态
// a pedding: 初始状态
// b fulfilled: 操作成功 resolved / rejected
// c rejected: 操作失败

// 2 优缺点
// 2.1.1 解决回调地狱
// 2.1.2 链式调用

// 2.2.1 pedding 不能取消
// 2.2.2 状态确定后不能改变
// 2.2.3 需要手动捕捉异常 .catch

// 手写Promise⭐️⭐️⭐️⭐️⭐️ - 请移步面试题库
// promise.then
// promise.catch
// promise.all
// promise.race

// ************************************************************************************************************************

// AMD   vs   CMD
// AMD: 依赖前置，先引入，在使用   RequireJS   define(id,dependencies,factory)
// CMD: 依赖就近，用的时候在引入   SeaJS       define(function(require, exports, module){})

// CommonJS: 同步加载模块
// 1.1 module.exports
// 1.2 exports.xx

// import 和 require 导入的区别
// import: 对值的引用  编译时输出接口
// require: 对值的拷贝  运行时加载

// ************************************************************************************************************************

// 数组方法 ⭐️⭐️
// push  pop
// shift unshift
// splice
// reverse
// sort
// reduce reduceRight
// every some
// find  findIndex indexOf
// filter
// slice
// map
// forEach
// concat
// flat
// includes

// ************************************************************************************************************************

// for  vs  for ... in  vs  forEach ⭐️⭐️
// for in遍历数组会遍历到数组原型上的属性和方法，更适合遍历对象。遍历到myObject的原型方法method，如果不想遍历原型方法和属性的话，可以在循环内部判断一下hasOwnProperty方法可以判断某属性是否是该对象的实例属性。
// forEach不支持break，continue，return等

// for of可以成功遍历数组的值，而不是索引，不会遍历原型。
// ps 遍历对象自身原型  hasOwnProperty
// for of 主要遍历可迭代对象  [Symbol.iterator] Array  Map  Set  String arguments 等


// for...in 语句以任意顺序迭代对象的可枚举属性。
// for...of 语句遍历可迭代对象定义要迭代的数据。

// ************************************************************************************************************************

// let const vs var
// 6 var VS let VS const
// a var 声明的变量会挂载在 window 上
// b var 声明的变量会被提升
// c var 声明的变量可以重复赋值
// d let 和 const 声明的变量存在暂存死区
// e let 和 const 声明的变量形成块级作用域

// ************************************************************************************************************************
// 0.1 + 0.2 = 0.3  ⭐️⭐️
// js浅拷贝和深拷贝
