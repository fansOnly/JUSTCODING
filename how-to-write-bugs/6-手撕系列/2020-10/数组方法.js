/**
 * filter
 * 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
 * @param {*} callback { element, index, array }
 * @param {*} thisArg
 */
Array.prototype.filter = function(callback, thisArg) {
    if (this == undefined) {
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

var arr = [1,2,3,4,5]
console.log(arr.filter(x => x > 3)) // [4, 5]

/**
 * map
 * 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
 * @param {*} callback  { currentValue, index, array }
 * @param {*} thisArg 
 */
Array.prototype.map = function(callback, thisArg) {
    if (this == undefined) {
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

var arr = [1,2,3,4,5]
console.log(arr.map(x => x * 2)) // [2, 4, 6, 8, 10]

/**
 * forEach
 * 对数组的每个元素执行一次给定的函数。没有返回值
 * @param {*} callback { currentValue, index, array }
 * @param {*} thisArg 
 */
Array.prototype.forEach = function(callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const O = Object(this)
    const len = O.length >>> 0
    let k = 0
    while(k < len) {
        if (k in O) {
            callback.call(thisArg, O[k], k, O)
        }
        k++
    }
}

var arr2 = [1,2,3]
arr2.forEach(x => {
    console.log(x) // 1, 2, 3
})


/**
 * reduce
 * 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
 * @param {*} callback { accumulator, currentValue, index, array }
 * @param {*} initialValue 
 */
Array.prototype.reduce = function(callback, initialValue) {
    if (this == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const O = Object(this)
    const len = O.length >>> 0
    let accumulator = initialValue
    let k = 0
    if (accumulator === undefined) {
        while (k < len && !(k in O)) {
            k++
        }
        if (k >= len) {
            throw new TypeError('reduce a empty array with no initial value')
        }
        accumulator = O[k++]
    }
    while (k < len) {
        if (k in O) {
            accumulator = callback.call(undefined, accumulator, O[k], k, O)
        }
        k++
    }
    return accumulator
}

var arr = [1, 2, 3]
console.log(arr.reduce((a, b) => a + b)) // 6


/**
 * find
 * 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 * @param {*} callback { element, index, array }
 * @param {*} thisArg 
 */
Array.prototype.find = function(callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const O = Object(this)
    const len = O.length >>> 0
    let k = 0
    while(k < len) {
        const kValue = O[k]
        if (callback.call(thisArg, O[k], k, O)) {
            return kValue
        }
        k++
    }
    return undefined
}

var arr = [1,2,3,4,5]
console.log(arr.find(x => x == 3)) // 3
console.log(arr.find(x => x == 30)) // undefined




/**
 * findIndex
 * 返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
 * @param {*} callback { element, index, array }
 * @param {*} thisArg 
 */
Array.prototype.findIndex = function(callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const O = Object(this)
    const len = O.length >>> 0
    let k = 0
    while (k < len) {
        const kValue = O[k]
        if (callback.call(thisArg, kValue, k, O)) {
            return k
        }
        k++
    }
    return -1
}

var arr = [1,2,3,4,5]
console.log(arr.findIndex(x => x == 3)) // 2


/**
 * indexOf
 * 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
 * @param {*} searchElement 
 * @param {*} fromIndex 
 */
Array.prototype.indexOf = function (searchElement, fromIndex) {
    if (this == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    const O = Object(this)
    const len = O.length >>> 0
    if (len === 0) return -1
    let k = 0
    let n = +fromIndex || 0
    if (n > len) return -1
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
    while (k < len) {
        if (k in O && O[k] === searchElement) {
            return k
        }
        k++
    }
    return -1
}

var arr = [1,2,3,4,5]
console.log(arr.indexOf(4)) // 3


/**
 * lastIndexOf // TODO
 * 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。
 * 从数组的后面向前查找，从 fromIndex 处开始。
 * @param {*} searchElement 
 * @param {*} fromIndex 
 */
Array.prototype.lastIndexOf = function(searchElement, fromIndex) {}


/**
 * every
 * 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
 * @param {*} callback 
 * @param {*} thisArg 
 */
Array.prototype.every = function(callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const O = Object(this)
    const len = O.length >>> 0
    let k = 0
    while (k < len) {
        let kValue
        if (k in O) {
            kValue = O[k]
            const testValue = callback.call(thisArg, kValue, k, O)
            if (!testValue) {
                return false
            }
        }
        k++
    }
    return true
}

var arr = [1,2,3,4,5]
console.log(arr.every(x => x > 0)) // true



/**
 * some
 * 测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
 * @param {*} callback { element, index, array }
 * @param {*} thisArg 
 */
Array.prototype.some = function(callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or undefined.')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function.`)
    }
    const O = Object(this)
    const len = O.length >>> 0
    let k = 0
    while (k < len) {
        if (k in O) {
            if (callback.call(thisArg, O[k], k, O)) {
                return true
            }
        }
        k++
    }
    return false
}

var arr = [1,2,3,4,5]
console.log(arr.some(x => x > 5)) // true
