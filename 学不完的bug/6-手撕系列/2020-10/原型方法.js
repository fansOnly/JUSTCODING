/**
 * apply
 */
Function.prototype.apply = function(context = window, args) {
    if (typeof this !== 'function') {
        throw new TypeError('this is not a function.')
    }
    const fn = Symbol('fn')
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}


/**
 * call
 */
Function.prototype.call = function(context = window, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('this is not a function.')
    }
    const fn = Symbol('fn')
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}


/**
 * bind
 */
Function.prototype.bind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('this is not a function.')
    }
    let self = this
    return function Fn() {
        if (self instanceof Fn) {
            return new Fn(...args, ...arguments)
        }
        return self.apply(context, [...args, ...arguments])
    }
}


/**
 * new
 * 1 创建一个空对象，构造函数中的 this 指向这个对象
 * 2 为这个对象执行原型连接
 * 3 执行构造函数方法，属性和方法被添加到 this 引用的对象中
 * 4 如果构造函数没有返回，则返回 this，即新创建的对象，否则返回构造函数返回的对象
 */
function newF(Ctor, ...args) {
    const obj = Object.create(null)
    obj.__proto__ = Ctor.prototype
    const ret = Ctor.call(obj, ...args)
    return typeof ret === 'object' && ret !== null ? ret : obj
}

function newF2() {
    let obj = {}
    let [Ctor, ...args] = [...arguments]
    obj.__proto__ = Ctor.prototype
    let ret = Ctor.apply(obj, args)
    return ret && typeof ret === 'object' ? ret : obj
}



/**
 * instanceof
 */
function instanceofF(left, right) {
    const proto = right.prototype
    left = left.__proto__
    while (true) {
        if (left === null) return false
        if (left === proto) return true
        left = left.__proto__
    }
}
