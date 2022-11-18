/**
 * 实现instanceof
 * 递归判断目标对象的原型指向与比较的构造函数的原型是否一致
 */
function myInstanceOf(left, right) {
    const proto = right.prototype
    left = Object.getPrototypeOf(left)
    while(left !== null) {
        if (left === proto) return true
        left = Object.getPrototypeOf(left)
    }
    return false
}

const obj = {}

// console.log(Object.prototype, Function.prototype)
console.log(myInstanceOf(obj, Object)) // true

function Parent() {}
function Parent2() {}

const p1 = new Parent()

const p2 = new Parent2()

console.log(myInstanceOf(p1, Parent)) // true

console.log(p2 instanceof Parent)
console.log(myInstanceOf(p2, Parent)) // false
