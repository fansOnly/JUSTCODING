/**
 * 通过栈结构实现数组扁平化
 */
const flatArray = arr => {
  if (!Array.isArray(arr)) return arr
  const stack = [...arr]
  const res = []
  while (stack.length) {
    const value = stack.shift()
    Array.isArray(value) ? stack.push(...value) : res.push(value)
  }
  return res
}
const arr1 = [1,2,[3,4,[5,6,[7,8]],9]]
console.log(flatArray(arr1))


/**
 * 懒加载
 */
const lazyLoad = imgs => {
  const observer = new MutationObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.src = dataset.src
        observer.unobserve(entry.target)
      }
    })
  })
  imgs.forEach(img => observer.observe(img))
}


/**
 * 惰性函数
 */
function lazyFunction(val) {
  console.log('init')
  if (val == 1) {
    fn = function() {
      console.log('1')
    }
  } else {
    fn = function() {
      console.log('222')
    }
  }
  return fn
}

const res1 = lazyFunction(1)
res1()
res1()
res1()



function myNew(fn) {
  const Ctor = Object.create(fn.prototype)
  const res = fn.apply(Ctor, ...arguments)
  return typeof res === 'object' && res !== null ? res : Ctor
}


function myInstanceOf(left, right) {
  left = left.__proto__
  while (left) {
    if (left === null) return false
    if (left === right.prototype) return true
    left = left.__proto__
  }
  return false
}

function Sup() {}
const s1 = new Sup()
function Sup2() {}
const s2 = new Sup2()
console.log(s1 instanceof Sup)
console.log(myInstanceOf(s2, Sup))
console.log(myInstanceOf(s2, Sup2))


function myCall(context = 'window', ...args) {
  const fn = Symbol()
  context[fn] = this
  const res = context[key](...args)
  delete context[fn]
  return res
}

function myApply(context = 'window', args) {
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}


Function.prototype.myBind = function (context = 'window', ...args) {
  const self = this
  function Noop() {}

  const fBound = function () {
    return self.apply(self instanceof fBound ? this : context, [...args, ...arguments])
  }

  if (this.prototype) {
    Noop.prototype = this.prototype
  }

  fBound.prototype = new Noop()
  return fBound
}

const o1 = {
  name: 'o1',
  say() {
    return this.name
  }
}
const o2 = {
  name: 'o2'
}

const say = o1.say.myBind(o2)
console.log(say()) // o2

/**
 * 实现 async
 */
const generateAsync = fn => {
  return new Promise((resolve, reject) => {
    const gen = fn()
    const step = (type, args) => {
      let next
      try {
        next = gen[type](args)
      } catch (error) {
        reject(err)
      }
      const { done, value } = next
      if (done) {
        resolve(value)
      }
      Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
    }
    step('next')
  })
}


/**
 * 单例模式
 */
// 通过必闭包
const singleFn = function(fn) {
  let result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}

// proxy 代理
const singleFn2 = function(fn) {
  let result
  const handler = {
    constructor: function() {
      if (!result) {
        result = Reflect.construct(fn, arguments)
      }
      return result
    }
  }
  return new Proxy(fn, handler)
}


/**
 * Object.creat()
 */
function create(ctor) {
  function F() {}
  F.prototype = ctor
  return new F()
}



/**
 * 实现一个 compose 函数
 */
// 闭包
function compose1(fns) {
  return function() {
    let start = fns.length - 1
    let result
    while(start >= 0) {
      result = fns[start].apply(fns[start], arguments)
      start--
    }
    return result
  }
}

// reduce
const compose2 = fns => {
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}


const f1 = a => {return a}
const f2 = a => {return a}


const f3 = compose1([f1, f2])
console.log(f3(2))

const f4 = compose2([f1, f2])
console.log(f4(2))


function A() {
  var a = Math.random()
  // 挂在在原型上，多个实例共享
  // A.prototype.getA = () => a
  // 挂在在 this 上，每个实例的值是单独的，不会与其他实例重复
  this.getA = () => a
}

const a1 = new A()
console.log(a1.getA())

const a2 = new A()
console.log(a2.getA())
console.log(a1.getA())
