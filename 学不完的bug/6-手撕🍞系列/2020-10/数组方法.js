/**
 * filter
 */
Array.prototype.filter = function(callback, thisArg) {
    if (thisArg == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const res = []
    const O = Object(this)
    const len = O.length >>> 0
    for (let i = 0; i < len; i++) {
        if (i in O) {
            if (callback.call(thisArg, O[i], i, O)) {
                res.push(O[i])
            }
        }
    }
    return res
}

/**
 * map
 */
Array.prototype.map = function(callback, thisArg) {
    if (thisArg == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const res = []
    const O = Object(this)
    const len = O.length >>> 0
    for (let i = 0; i < len; i++) {
        if (i in O) {
            res[i] = callback.call(thisArg, O[i], i, O)
        }
    }
    return res
}

/**
 * forEach
 * 同 map，没有返回值
 */
Array.prototype.forEach = function(callback, thisArg) {
    if (thisArg == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const O = Object(this)
    const len = o.length >>> 0
    let k = 0
    while(k < len) {
        if (k in O) {
            callback.call(thisArg, O[k], k, O)
        }
        k++
    }
}
