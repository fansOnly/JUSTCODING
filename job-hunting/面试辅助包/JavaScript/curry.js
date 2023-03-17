/**
 * 无限累加版本
 */
function curry2(fn, ...args) {
  const allArgs = [...args]
  return function curried(...args2) {
    if (!args2.length) return fn.apply(this, allArgs)
    allArgs.push(...args2)
    return curried
  }
}

const add2 = (...args) => {
  return [...args].reduce((acc, cur) => acc + cur)
}
const curriedAdd2 = curry2(add2, 4)

console.log(curriedAdd2(1)(2)())

/**
 * 普通版本
 */
function curry(fn, ...args) {
  return function (...args2) {
    const allArgs = [...args, ...args2]
    return allArgs.length >= fn.length ? fn.apply(this, allArgs) : curry.call(this, fn, ...allArgs)
  }
}

const add = (a, b, c) => a + b + c
const curriedAdd = curry(add)

console.log(curriedAdd(1, 2, 3))

/**
 * es6 版本
 */
const curry7 = (fn, ...args) => fn.length <= args.length ? fn(...args) : curry7.bind(null, fn, ...args)
const add7 = (a, b, c) => a + b + c
const curriedAdd7 = curry7(add7)
console.log('curriedAdd7: ', curriedAdd7(1)(2)(3))


// =============================================================
// =============================================================
// =============================================================
/**
 * 反柯里化
 */
function unCurry(fn) {
  return function () {
    const context = [].shift.call(arguments)
    return fn.call(context, ...arguments)
  }
}

function Toast() {
  this.message = 'toast'
}
Toast.prototype = {
  constructor: Toast,
  show: function () {
    console.log(this.message)
  }
}
const toast = new Toast()
toast.show() // toast

const objShow = unCurry(Toast.prototype.show)
objShow({ message: 'hello' }) // hello

Function.prototype.unCurry = function () {
  const context = this
  return function () {
    return Function.prototype.call.apply(context, arguments)
  }
}
const objShow2 = Toast.prototype.show.unCurry()
objShow2({ message: 'hello2' }) // hello2
