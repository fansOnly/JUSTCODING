/**
 * 数组的 filter 方法
 * 参数：callback(element[, index[, array]])[, thisArg]
 * https://tc39.es/ecma262/#sec-array.prototype.filter
 */
Array.prototype.myFilter = function(callbackFn, thisArg) {
    if (typeof this == null) {
        throw new TypeError('Array.prototype.filter called on null.')
    }
    if (typeof callbackFn !== 'function') {
        throw new TypeError(`${callbackFn} is not a function.`)
    }
    const O = Object(this),
        T = thisArg,
        len = O.length >>> 0,
        A = new Array(0)
    let k = 0, to = 0
    while (k < len) {
        if (k in O) {
            const kValue = O[k]
            if (callbackFn.call(T, kValue, k, O)) {
                A[to] = kValue
                to++
            }
        }
        k++
    }
    return A
}

const arr = [ 1, 2, 3, 4, 5 ]

const res = arr.myFilter(v => v > 2)

console.log(res)
