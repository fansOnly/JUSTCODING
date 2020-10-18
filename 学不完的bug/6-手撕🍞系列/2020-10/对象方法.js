/**
 * Object.assign
 * 用于将一个或多个源对象的可枚举属性复制到目标对象，并返回目标对象（浅拷贝）
 */
Object.defineProperty('Object', 'assign', {
    value: function (target, ...args) {
        if (target === null || target === undefined) throw new TypeError('can`t convert null or undefined to object.')
        const to = Object(target)
        for (let i = 0; i < args.length; i++) {
            const nextSource = args[i]
            if (nextSource !== null) {
                for (const nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey]
                    }
                }
            }
        }
        return to
    },
    enumerable: false,
    writable: true,
    configurable: true
})


/**
 * create
 */
function createF(proto) {
    function F() {}
    F.prototype = proto
    return new F()
}
