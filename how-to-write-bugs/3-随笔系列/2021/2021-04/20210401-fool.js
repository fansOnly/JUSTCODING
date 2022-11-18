

/**
 * new 和 create
 */
function create(proto) {
  function F() {}
  f.prototype = proto
  return new F()
}

function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const res = Ctor.apply(obj, args)
  return typeof res === 'object' && res !== null ? res : obj
}


function Sub(name) {
  this.name = name
}

const s1 = new Sub('s1')
console.log(s1)

const s2 = Object.create(s1)
console.log(s2)

const s3 = myNew(Sub, 's3')
console.log(s3)


/**
 * 防抖
 */
function debounce(fn, wait) {
  let timer
  return function() {
    if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait);
  }
}

/**
 * 节流
 */
function throtte(fn, delay) {
  let timer
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, delay);
    }
  }
}

/**
 * call
 */
Function.prototype.myCall = function(context = 'window', ...args) {
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

/**
 * apply
 */
Function.prototype.myApply = function (context = 'window', args) {
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](args)
  delete context[fn]
  return res
}

/**
 * bind
 */
Function.prototype.myBind = function (context = 'window', ...args) {
  const self = this
  return function fBound() {
    return self.apply(self instanceof fBound ? this : context, [...args, ...arguments])
  }
}

const obj1 = {
  a: 1,
}
const obj2 = {
  a: 2,
  say(age) {
    this.age = age
    console.log(this.a, this.age)
  }
}

obj2.say.myCall(obj1, 10) // 1
obj2.say.myApply(obj1, 15) // 1
const say = obj2.say.myBind(obj1, 20)
say() // 1

const obj3 = new say(50)
console.log(obj3)


/**
 * 千位分隔符
 */
const thousandFormat = (num) => {
  if (typeof +num !== 'number') {
    throw new Error(`${num} need to be a number`)
  }
  const pn = Number(num) > 0 ? '' : '-'
  let [integer, decimal] = num.split('.')
  integer = integer.replace(/[\-\+]/, '').replace(/(?!^)(?=(\d{3})+$)/g, ',')
  return decimal ? `${pn}${integer}.${decimal}` : integer
}

const num = '-123456890.123456'

console.log(thousandFormat(num))
