function newx(Ctor) {
    const obj = Object.create(Ctor)
    const ret = Ctor.call(obj, ...arguments)
    return typeof ret == 'object' && ret !== null ? ret : obj
}

function instanceOfx(left, right) {
    left = left.__proto__
    while (true) {
        if (!left) return false
        if (left === right.prototype) return true
        left = left.__proto__
    }
}
console.log(instanceOfx([], Array)) // true

Function.prototype.applyx = function(context, args) {
    const fn = Symbol()
    context = context || window
    context[fn] = this
    const res = context[fn](...args)
    delete context[fn]
    return res
}

Function.prototype.callx = function(context, ...args) {
    const fn = Symbol()
    context = context || window
    context[fn] = this
    const res = context[fn](...args)
    delete context[fn]
    return res
}

Function.prototype.bindx = function(fn) {
    const args = [].shift.call(arguments)
    let self = this
    return function bound() {
        fn.call(typeof this === self ? self : this, ...args, ...arguments)
    }
}

const p = {
    name: 'p'
}
const c = {
    name: 'c'
}
function say() {
    console.log(this.name) // p
}
say.bind(p)()


function createx(Ctor) {
    function F() {}
    F.prototype = Ctor
    return new F()
}

const o1 = {
    name: 'o1'
}
const o2 = createx(o1)
console.log(o2.name) // o1
console.log(o2.__proto__ === o1) // true


const arr = [1,2,3,4,5]
Array.prototype.reducex = function (callback, initialVal) {
    let [val, index] = initialVal ? [initialVal, 0] : [this[0], 1]
    for (let i = index; i < this.length; i++) {
        val = callback(val, this[i], i, this)
    }
    return val
}

console.log(arr.reducex((a, b) => a + b)) // 15
console.log(arr.reducex((a, b) => a + b, 10)) // 25


Array.prototype.forEachx = function(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this)
    }
}

arr.forEachx(v => {
    console.log(v) // 1 2 3 4 5
})

Array.prototype.mapx = function(callback, thisArg) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        res[i] = callback.call(thisArg, this[i], i, this)
    }
    return res
}

console.log(arr.map(v => ++v)) // 2, 3, 4, 5, 6
console.log(arr.mapx(v => ++v)) // 2, 3, 4, 5, 6

/**
 * jsonp
 */
function jsonp(url, params, callback) {
    const func_name = 'jsonp_' + Date.now() + Math.random().toString().substr(2, 5)
    let paramStr, paramArr = []
    for (let key in params) {
        paramArr.push(`${key}=${params[key]}`)
    }
    paramStr = paramArr.join('&')

    const script = document.createElement('script')
    script.src = `${url}?${paramStr}&callback=${func_name}`
    document.body.appendChild(script)

    window[func_name] = data => {
        callback(data)
        delete window[func_name]
        document.body.removeChild(script)
    }
}

// jsonp('/test', {a: 1}, data => {
//     console.log(data)
// })
