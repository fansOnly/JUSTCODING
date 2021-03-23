/**
 * 数组的 map 方法
 * 参数：callback(currentValue[, index[, array]])[, thisArg]
 * https://tc39.es/ecma262/#sec-array.prototype.map
 */
Array.prototype.myMap = function(callbackFn, thisArg) {
    if (this === null) {
        throw new TypeError('Array.prototype.map called on null.')
    }
    if (typeof callbackFn !== 'function') {
        throw new TypeError(`${callbackFn} is not a function.`)
    }
    let O = Object(this),
        T = thisArg,
        len = O.length >>> 0,
        A = new Array(len)
    let k = 0
    while (k < len) {
        if (k in O) {
            const mappedValue = callbackFn.call(T, O[k], k, O)
            A[k] = mappedValue
        }
        k++
    }
    return A
}

const arr = [ 1, 2, 3 ]

const res = arr.myMap((val, index, arr) => {
    console.log(index)
    console.log(arr)
    return val * 2
})

console.log(res)
