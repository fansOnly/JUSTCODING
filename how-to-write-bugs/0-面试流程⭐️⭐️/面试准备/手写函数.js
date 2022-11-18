/**
 * 失败重试函数
 */
function retry(fn, times, timeout) {
  return new Promise((resolve, reject) => {
    function execute() {
      Promise.resolve(fn).then(res => {
        resolve(res)
      }).catch(err => {
        if (times > 0) {
          setTimeout(execute, timeout)
          times--
        } else {
          reject(err)
          console.log('err: ', err);
        }
      })
    }
    execute()
  })
}

const r = Promise.reject('r')
retry(r, 3, 100)

/**
 * 深拷贝
 */
const deepCopy1 = data => JSON.parse(JSON.stringify(data))

const getType = str => {
  return Object.prototype.toString.call(str).replace(/\[object\s(.+)\]/, '$1').toLowerCase()
}

// console.log(getType('1'))
// console.log(getType(1))
// console.log(getType(!1))
// console.log(getType({}))
// console.log(getType([]))
// console.log(getType(null))
// console.log(getType(undefined))

const deepClone = function(target, cache = new WeakMap()) {
  if (typeof target !== 'object' || target === null) return target
  if (cache.has(target)) {
    return cache.get(target)
  }
  const type = getType(target)
  if (type === 'date') return new Date(target)
  if (type === 'regexp') return new RegExp(target)
  if (type === 'set') return new Set(target)
  if (type === 'map') return new Map(target)
  const clone = Array.isArray(target) ? [] : {};
  // const clone = new target.constructor // 这样赋值默认会拷贝原型上的属性
  cache.set(target, clone)

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = deepClone(target[key], cache)
    } else {
      // 是否需要拷贝原型上的属性
      // clone[key] = target[key]
    }
  }

  // const symbolKeys = Object.getOwnPropertySymbols(target)
  // for (const i = 0; i < symbolKeys.length; i++) {
  //   const key = symbolKeys[i]
  //   if (target.hasOwnProperty(key)) {
  //     clone[key] = deepClone(target[key], cache)
  //   }
  // }

  return clone
}

function Parent() {
  this.age = 20
}

const obj = {
  a: 1,
  // b: 'b',
  // c: false,
  // d: {
  //   d1: 'd1'
  // },
  // k: [1,2,3],
  // e: () => {},
  // f: new Date(),
  // g: new RegExp(),
  // h: Symbol(),
  i: new Set([1,2]),
  j: new Map().set('j', 'j1')
}
obj.__proto__ = new Parent()
const obj2 = Object.assign({}, obj)

const cloneObj = deepClone(obj)
console.log(obj === cloneObj)
console.log('deepClone =>', cloneObj)


/**
 * 管道函数
 */
function compose(list) {
  const init = list.shift()
  return function(...args) {
    return list.reduce((pre, cur) => {
      return pre.then(res => {
        // 将上一个函数执行的结果当作下一个函数的参数传入
        return cur.call(null, res)
      })
    }, Promise.resolve(init.apply(null, args)))
  }
}

const af1 = data => {
  console.log('async 1')
  return data + 1
}
const af2 = data => {
  console.log('async 2')
  return data * 2
}
const af = compose([af1, af2])
af(5).then(res => {
  console.log('af', res)
})

const ap1 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('ap1')
      resolve(data +1)
    }, 200);
  })
}
const ap2 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('ap2')
      resolve(data * 3)
    }, 100);
  })
}
const ap = compose([ap1, ap2])
ap(3).then(res => {
  console.log('ap', res)
})

/**
 * 函数柯里化
 */
function curry(fn, ...args) {
  const length = fn.length
  return function() {
    const allArgs = [...args, ...arguments]
    if (allArgs.length === length) {
      return fn.apply(null, allArgs)
    } else {
      return curry(fn, ...allArgs)
    }
  }
}

const add = (a, b, c) => {
  return a + b + c
}
const curryAdd = curry(add, 1)
console.log(curryAdd(2)(3))

const curry1 = (fn, ...args) => fn.length <= args.length ? fn.call(null, ...args) : curry1.bind(null, fn, ...args)
const curryAdd1 = curry1(add, 1)
console.log(curryAdd1(2)(3))

function curry2(fn, ...args) {
  let allArgs = [...args]
  return function next(...rest) {
    allArgs = [...allArgs, ...rest]
    return rest.length > 0 ? next : fn.apply(null, allArgs)
  }
}
const curryAdd2 = curry2(add, 1)
console.log(curryAdd2(2)(3)())

/**
 * 反柯里化
 */
function unCurry(fn) {
  return function() {
    const context = [].shift.call(arguments)
    return fn.call(context, ...arguments)
  }
}

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

const objShow = unCurry(Toast.prototype.show)
objShow({ message: 'hello' }) // hello

Function.prototype.unCurry = function() {
  const context = this
  return function() {
    return Function.prototype.call.apply(context, arguments)
  }
}
const objShow2 = Toast.prototype.show.unCurry()
objShow2({ message: 'hello2' }) // hello2
