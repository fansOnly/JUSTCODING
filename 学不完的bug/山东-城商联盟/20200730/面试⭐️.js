// 闭包
// 函数内部访问父级函数作用域变量的一种实现方式
// 常用于返回一个函数


// dom - 文档对象模型


// promise - 异步编程的一种解决方案
// pending - resolved - rejected


// 原型
// 显式原型对象 - prototype - 函数
// 隐式原型对象 - __proto__ - 对象 [[Prototype]]


// js提升 - 变量/函数提升到作用域的顶部
// var 声明的变量
// function fn() {} 定义的函数


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



// 纯函数
// 输入相同, 输出相同
// 没有可观察到的副作用



// 构造函数 - 通过new实例化对象的函数, 表现某一类对象的共同特征
// 除了箭头函数, 基本所有的函数都可以作为构造函数
// 拥有构造方法 - constructor
// 拥有原型对象 - prototype
// 默认首字母大写




// 类 - es6 Class声明
// 基类 - constructor() {}
// 派生类- extends - constructor() {super()} 继承
