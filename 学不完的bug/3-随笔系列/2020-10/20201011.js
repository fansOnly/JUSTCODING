
/**
 * Vue 源码学习
 */
var _toString = Object.prototype.toString

/**
 * 获取数据类型
 * @param {any} value
 */
function toRawtype(value) {
    return _toString.call(value).splice(8, -1)
}

/**
 * 利用闭包构造map缓存数据
 * @param {String} str 
 */
function makeMap(str) {
    let map = Object.create(null)
    var list = str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return function(val) {
        return map[val]
    }
}

const domElements = makeMap('html,body,head,div')
console.log(domElements('div')) // true

/**
 * 二维数组扁平化
 * @param {Array} children 
 */
function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            return Array.prototype.concat.apply([], children)
        }
    }
    return children
}

/**
 * 拦截数组方法
 */
var ARRAY_METHOD = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']
var array_methods = Object.create(Array.prototype)
ARRAY_METHOD.forEach(method => {
    array_methods[method] = function() {
        return Array.prototype[method].apply(this, arguments)
    }
})

/**
 * 执行一次的函数
 * @param {Function} fn 
 */
function once(fn) {
    var called = false
    return function() {
        if (!called) {
            called = true
            return fn.apply(this, arguments)
        }
    }
}

/**
 * 浅拷贝比较
 * @param {any} a 
 * @param {any} b 
 */
function looseEqual(a, b) {
    if (a === b) return true
    var isObjectA = isObject(a)
    var isObjectB = isObject(b)
    if (isObjectA && isObjectB) {
        try {
            var isArrayA = Array.isArray(a)
            var isArrayB = Array.isArray(b)
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every((v, i) => {
                    return looseEqual(v, b[i])
                })
            } else if (!isArrayA && !isArrayB) {
                var keysA = Object.keys(a)
                var keysB = Object.keys(b)
                return keysA.length === keysB.length && keysA.every(k => {
                    return looseEqual(a[k], b[k])
                })
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
    } else {
        return false
    }
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

// 华丽的分割线

/**
 * 实现call函数
 * @param {*} context 
 */
Function.prototype.callF = function(context, ...args) {
    if (typeof this !== 'function') throw new TypeError('not a function')
    const fn = Symbol('fn')
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

// function F1(name, price) {
//     this.name = name
//     this.price = price
// }

// function F2(name, price) {
//     // F1.call(this, name, price)
//     F1.callF(this, name, price) // 浏览器环境测试
//     this.category = 'food'
// }

// var f1 = new F1('f1', 1)
// console.log(f1)
// var f2 = new F2('f2', 2)
// console.log(f2)

/**
 * 实现apply函数
 * @param {*} context 
 */
Function.prototype.applyF = function(context, args) {
    if (typeof this !== 'function') throw new TypeError('not a function')
    const dn = Symbol('fn')
    context = context || window
    context.fn = this
    const result = context.fn(args)
    delete context.fn
    return result
}

/**
 * 实现bind函数
 * @param {*} context 
 */
Function.prototype.bindF = function(context) {
    if (typeof this !== 'function') throw new TypeError('need function...')
    let args = Array.prototype.slice.call(arguments, 1)
    let fn = this
    return function Fn() {
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}


/**
 * create函数
 * @param {*} proto
 */
function create(proto) {
    function F() {}
    F.prototype = proto
    return new F()
}

var obj = {
    a: 1
}

var obj1 = Object.create(obj)
console.log(obj1.a) // 1

var obj2 = create(obj)
console.log(obj2.a) // 1


/**
 * new 函数
 */
function newF() {
    var obj = {}
    let Contor = [].shift.apply(arguments)
    obj.__proto__ = Contor.prototype
    let ret = Contor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}


/**
 * 实现instanceof函数
 * @param {*} left 
 * @param {*} right 
 */
function instanceF(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while (true) {
        if (left === null || left === undefined) return false
        if (left === prototype) return true
        left = left.__proto__
    }
}


/**
 * es5版柯里化
 * @param {*} fn 
 * @param {*} args 
 */
function curryF(fn, args) {
    let len = fn.length
    args = args || []
    return function() {
        let allArgs = args.concat(...arguments)
        if (allArgs.length >= len) {
            return fn.apply(this, allArgs)
        } else {
            return curryF.call(this, fn, allArgs)
        }
    }
}

/**
 * es6版柯里化
 * @param {*} fn 
 * @param  {...any} args 
 */
function curryFes6(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curryFes6.bind(null, fn, ...args)
}
