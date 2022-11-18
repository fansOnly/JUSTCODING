/**
 * 实现 new
 * 1. 根据传入的函数原型创建一个新的空对象
 * 2. 将新创建的对象的this绑定到传入的对象
 * 3. 如果新的对象返回了一个对象，则返回这个对象，否则返回新创建的空对象
 */
function myNew(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new TypeError (`${ctor} must be a function.`)
    }
    const obj = Object.create(ctor.prototype)
    const res = ctor.apply(obj, args)
    return (typeof res === 'object' && res !== null) || typeof res === 'function' ? res : obj
}


function Parent(name) {
    this.name = name

    // return {}
    // return () => 1
}

const f1 = new Parent('f1')
console.log(f1)

const f2 = myNew(Parent, 'f2')
console.log(f2)
