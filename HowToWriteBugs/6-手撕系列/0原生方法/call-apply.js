/**
 * 改变this指向并立即执行
 * call 接受多个参数
 * apply 接受数组
 */
Function.prototype.myCall = function(context = window, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('caller must be a function.')
    }
    const fn = Symbol('fn')
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

Function.prototype.myApply = function(context = window, args) {
    if (typeof this !== 'function') {
        throw new TypeError('caller must be a function.')
    }
    const fn = Symbol('fn')
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

const obj1 = {
    name: 'lily',
    age: 10,
    say(weight) {
        return `I'm ${this.name}, and I'm ${this.age} years old, I'm ${weight} kg.`
    }
}

const obj2 = {
    name: 'john',
    age: 20
}

console.log(obj1.say(30))
// I'm lily, and I'm 10 years old, I'm 30 kg.

console.log(obj1.say.myCall(obj2, 50))
// I'm john, and I'm 20 years old, I'm 50 kg.
