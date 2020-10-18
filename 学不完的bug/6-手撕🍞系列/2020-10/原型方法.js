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
 */
function newF(contor, ...args) {
    const obj = Object.create(null)
    obj.__proto__ = contor.prototype
    const ret = contor.call(obj, ...args)
    return typeof ret === 'object' && ret !== null ? ret : obj
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
