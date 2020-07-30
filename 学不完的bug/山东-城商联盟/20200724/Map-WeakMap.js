// Map
// 1 可以存储任意类型的键值
// 2 通过size属性获取键值对个数
// 3 只能手动添加键值
// 4 频繁操作键值对的时候性能较好

// NaN作为Map的键名时指向唯一
// Map的get方法默认通过键名===比较来获取键值


// new 的流程
// 1 创建一个新对象
// 2 将this指向构造函数
// 3 如果构造函数有返回, 则替换new出来的对象并返回
// 4 如果构造函数没有返回, 则返回new出来的对象
function newFn(fn, args) {
    const obj = Object.create(fn.prototype)
    const res = fn.apply(obj, args)
    return typeof res === 'object' && res !== null ? res : obj
}

function newFn2() {
    const Con = Array.prototype.shift.call(arguments)
    const res = Object.create(null)
    res.__proto__ = Con.prototype
    Con.call(obj, ...arguments)
    return res
}

// create的流程
// 1 创建一个函数
// 2 将函数的原型指向当前继承的原型
// 3 返回新的对象
function createFn(proto) {
    function F() {}
    F.prototype = proto
    return new F()
}


Function.prototype.myApply = function(thisArgs, args) {
    let fn = Symbol('fn')
    thisArgs = thisArgs || window
    thisArgs[fn] = this
    const res = thisArgs[fn](...args)
    delete thisArgs[fn]
    return res
}
