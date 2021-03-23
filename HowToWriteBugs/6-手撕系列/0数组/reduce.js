/**
 * 数组的 reduce 方法
 * 参数：callback(accumulator[, currentValue[, index[, array]]])[, initialValue]
 * https://tc39.es/ecma262/#sec-array.prototype.reduce
 */
Array.prototype.myReduce = function(callbackFn, initialValue) {
    if (this === null) {
        throw new TypeError('Array.prototype.reduce called on null.')
    }
    if (typeof callbackFn !== 'function') {
        throw new TypeError(`${callbackFn} is not a function.`)
    }
    const O = Object(this),
        len = O.length >>> 0
    let k = 0
    let accumulator
    if (initialValue) {
        accumulator = initialValue
    } else {
        while(k < len && !(k in O)) {
            k++
        }
        if (k >= len) {
            throw new TypeError('Reduce empty array with no initial value.')
        }
        accumulator = O[k++] // 设定初始值后，将数组的开始下标后移一位
    }
    if (k === len && accumulator === 'unfefined') {
        throw new TypeError()
    }
    while(k < len) {
        if (k in O) {
            accumulator = callbackFn.call(undefined, accumulator, O[k], k, O)
        }
        k++
    }
    return accumulator
}

const arr = [ 1, 2, 3 ]

const res = arr.myReduce((acc, cur) => acc + cur, 0)

console.log(res)
