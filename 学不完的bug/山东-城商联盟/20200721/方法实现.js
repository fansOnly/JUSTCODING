// 实现 new1
function newFn(fn, args) {
    const obj = Object.create(fn.prototype)
    const res = fn.apply(obj, args)
    return typeof res === 'object' && res !== null ? res : obj
}

// 实现 new2
function newFn2() {
    const Constructor = Array.prototype.shift.call(arguments)
    const obj = Object.create(null)
    obj.__proto__ = Constructor.prototype
    Constructor.call(obj, ...arguments)
    return obj
}

// 实现 apply
Function.prototype.myApply = function(thisArg, args) {
    let fn = Symbol('fn')
    thisArg = thisArg || window
    thisArg[fn] = this
    const res = thisArg[fn](args)
    delete thisArg[fn]
    return res
}

// 实现 call
Function.prototype.myCall = function(thisArg, ...args) {
    let fn = Symbol('fn')
    thisArg = thisArg || window
    thisArg[fn] = this
    const res = thisArg[fn](...args)
    delete thisArg[fn]
    return res
}

// 实现 bind
function myBind() {
    var self = this
    var fn = Array.prototype.shift.call(arguments)
    var args = Array.prototype.slice.call(arguments)
    return function () {
        self.apply(fn, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)))
    }
}

// Object.create
Object.prototype.create = function (obj) {
    let F = function () { }
    F.prototype = obj
    return new F()
}
var obj1 = {
    name: 'obj1'
}
var obj2 = Object.create(obj1)
console.log(obj2.__proto__)
console.log(obj1)


// instanceof
function myInstanceof(L, R) {
    if (L === null) return false
    let proto = R.prototype
    while(L.__proto__) {
        if (L.__proto__ === proto) return true
        L = L.__proto__
    }
    return false
}

console.log(myInstanceof({}, Object)) // true
console.log(myInstanceof([], Array)) // true
console.log(myInstanceof([], Object)) // true
console.log(myInstanceof(null, Object)) // false

console.log(null instanceof Object) // false
console.log([] instanceof Object)
// console.log(myInstanceof('dd', String))
console.log(myInstanceof(!'', String))
