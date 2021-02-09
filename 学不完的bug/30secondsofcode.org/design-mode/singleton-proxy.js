/**
 * javascript-singleton-proxy
 */
const singleton = className => {
    return new Proxy(className.prototype.constructor, {
        instance: null,
        construct: (target, args) => {
            return this.instance || (this.instance = new target(...args))
        }
    })
}

class MyClass {
    constructor(msg) {
        this.msg = msg
    }
    printMsg() {
        console.log(this.msg)
    }
}


const singletonMyClass = singleton(MyClass)

const c1 = new singletonMyClass('first')
c1.printMsg() // first

const c2 = new singletonMyClass('second')
c2.printMsg() // first


// 数组项累加和
const arr = [1,2,3,4,5]
const res = arr.reduce((x, y) => [...x, x[x.length - 1] + y], [0])
console.log(res)
