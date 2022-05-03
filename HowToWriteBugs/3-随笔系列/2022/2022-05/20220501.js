/*
 * @Author: fansonly
 * @Date: 2022-05-01 15:35:29
 * @Description:
 * @LastEditTime: 2022-05-02 16:08:51
 */


// 柯里化
/**
 * 实现 add(1)(2, 3)(4)() = 10 的效果
 * 1. 传入参数时，代码不执行输出结果，而是先记忆起来
 * 2. 当传入空的参数时，代表可以进行真正的运算
 */
function curry(fn) {
  let allArgs = Array.prototype.slice.call(arguments, 1)
  return function next(...args2) {
    allArgs = [...allArgs, ...args2]
    return args2.length > 0 ? next : fn.apply(null, allArgs)
  }
}

const add = curry(function () {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
})

console.log(add(1, 2)(4)())


/**
 * 实现 add(1)(2, 3)(4)(5) = 15 的效果
 */
function curry2(fn) {
  let allArgs = [].slice.call(arguments, 1)
  function next() {
    allArgs = [...allArgs, ...arguments]
    return next
  }

  next.toString = function () {
    return fn.apply(null, allArgs)
  }
  next.valueOf = function () {
    return fn.apply(null, allArgs)
  }
  return next
}

const add2 = curry2(function() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
})

console.log(add2(1)(2, 3)(4)(5) == 15)


/**
 * 反柯里化
 * 1. 非我之物，为我所用
 * 2. 增加被反柯里化方法接收的参数
 */
function Toast() {
  this.message = 'toast'
}
Toast.prototype = {
  constructor: Toast,
  show: function() {
    console.log(this.message)
  }
}
const toast = new Toast()
toast.show() // toast

var obj = {
  message: 'hello'
}

// 反柯里化函数
function unCurry(fn) {
  return function() {
    // 将 this 指向为当前执行的对象
    const context = arguments[0]
    const args = [].slice.call(arguments, 1)
    return fn.apply(context, args)
  }
}

const objShow = unCurry(Toast.prototype.show)
objShow(obj) // hello

// 扩展 Function 原型实现反柯里化
Function.prototype.unCurry = function() {
  // 将 this 指向为当前执行的对象
  const context = this
  return function() {
    return Function.prototype.call.apply(context, arguments)
  }
}

const objShow2 = Toast.prototype.show.unCurry()
objShow2(obj) // hello



// 闭包陷阱
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
// a = fun(n, o = 0)

var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?

var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?
// c = fun(n, 1)



// arguments
function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a, b, c) {
  c = 10
  sidEffecting(arguments);
  // a = 10, b = 2, c = 10
  return a + b + c;
}
function demo (arg) {
  arg.name = 'new Name'
}
console.log(bar(2, 2, 2)) // 22

// 在严格模式下，arguments对象已与过往不同。arguments[@@iterator]不再与函数的实际形参之间共享，同时caller属性也被移除。
// 当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，那么arguments对象中的值不会跟踪参数的值（反之亦然）
function bar2(a, b, c = 4) {
  c = 10
  sidEffecting(arguments);
  // a = 2, b = 2, c = 10
  return a + b + c;
}
console.log(bar2(2, 2, 2)) // 14




/**
 * [].concat[1,2,3]
 * 1. 第一步计算[].concat,结果是Array.prototype.concat
 * 2. 第二步执行一个逗号操作符，逗号操作符对它的每个操作对象求值（从左至右），然后返回最后一个操作对象的值。
 * 3. 第三步执行一个数组访问运算或属性访问运算 = Array.prototype.concat[3]
 */



/**
 * 判断 NaN
 */
const objectIs = (x, y) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

console.log(objectIs(+0, -0))
console.log(objectIs(NaN, NaN))
console.log(objectIs(0, -0))





function foo() {
  let k = b = 0;
  k++;
  return k;
  }
  foo();
  console.log(typeof k); // => ???
  console.log(typeof b); // => ???


  var o = {
    a: 1
  }

  Object.assign(o, {s: 10})
  console.log(o)


  console.log(x)

var x = 10

function x() {}

console.log(x)
