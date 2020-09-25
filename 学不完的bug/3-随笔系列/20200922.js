
// ex - 1 隐式转换触发
class Fn {
    constructor(value) {
        this.value = value
    }
    valueOf() {
        return this.value++
    }
}

var a = new Fn(1)

console.log(a == 1 && a == 2 && a == 3) // true


// ex - 1 plus

var x = {
    value: 0,
    toString() {
        return ++this.value
    }
}

console.log(x == 1 && x == 2 && x == 3) // true


// ex - 2 全等
// var value = 1
// Object.defineProperty(window, 'a', {
//     get() {
//         return this.value++
//     }
// })

// console.log(a === 1)




// ex - 3  无限累加器
function add(a) {
    function sum(b) {
        a = b ? a + b : a
        return sum
    }
    sum.toString = function() {
        return a
    }
    return sum
}

console.log(add(1)(2)(3) == (1+2+3)) // true



// ex - 4 柯里化累加器
function curryAdd(...args) {
    let fn = (...args2) => {
        return curryAdd.apply(null, [...args, ...args2])
    }
    fn.toString = () => [...args].reduce((a, b) => a + b)
    return fn
}

console.log(curryAdd(1, 3)(2, 4)(5)(6) == 21) // true
