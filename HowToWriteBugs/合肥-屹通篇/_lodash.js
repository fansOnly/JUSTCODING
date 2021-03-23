// ******************************************************************************************************************************
// *************************************************** 数组 **********************************************************************
// ******************************************************************************************************************************

// _.chunk(array, [size=1])
// 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

const arrayChunkEs6 = (arr, size = 1) => {
    if (size <= 0) return arr;
    var res = [];
    var _arr = arr.slice();
    while (_arr.length) {
        res.push(_arr.splice(0, size));
    }
    return res;
}

function arrayChunk(arr, size) {
    size = size || 1;
    if (size <= 0) return arr;
    var res = [];
    var _arr = arr.slice();
    while (_arr.length) {
        res.push(_arr.splice(0, size));
    }
    return res;
}

var arr = [1, 2, 3, 4, 5, 6, 7]
console.log(arrayChunkEs6(arr, 3)) // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7 ] ]
console.log(arrayChunk(arr, 3)) // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7 ] ]
console.log(arr) // [1, 2, 3, 4, 5, 6, 7]

// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.compact(arr)
// 创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。

const arrayCompactEs6 = arr => {
    return arr.filter(Boolean);
}

function arrayCompact(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            res.push(arr[i]);
        }
    }
    return res;
}

var arr = [1, 2, 3, false, 3, null, 5, 0, 2, "", 8, undefined, 9, NaN]
console.log(arrayCompactEs6(arr)) // [ 1, 2, 3, 3, 5, 2, 8, 9 ]
console.log(arrayCompact(arr)) // [ 1, 2, 3, 3, 5, 2, 8, 9 ]


// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.concat(arr, [values])
// 创建一个新数组，将array与任何数组 或 值连接在一起。

const arrayContactEs6 = (arr, ...args) => {
    return [...arr, ...args.flat()];
}

function arrayContact(arr) {
    var res = arr.slice();
    var args = Array.prototype.splice.call(arguments, 1);
    for (let i = 0; i < args.length; i++) {
        if (Array.isArray(args[i])) {
            res = res.concat(args[i]);
        } else {
            res.push(args[i]);
        }
    }
    return res;
}

var arr = [1]

console.log(arrayContactEs6(arr, 2, [3], [[4]])) // [ 1, 2, 3, [ 4 ] ]
console.log(arrayContact(arr, 2, [3], [[4]])) // [ 1, 2, 3, [ 4 ] ]
console.log(arr) // [ 1 ]


// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.difference(array, [values])

// 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（注：即创建一个新数组，这个数组中的值，为第一个数组（array 参数）排除了给定数组中的值。）该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。

// 注意: 不像 _.pullAll，这个方法会返回一个新数组。

const arrayDifferenceEs6 = (arr, args = []) => {
    return args.length ? arr.filter(v => !args.includes(v)) : arr;
}

function arrayDifference(arr, args) {
    args = args || [];
    if (!args.length) return arr;
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        var flag = true;
        for (var j = 0; j < args.length; j++) {
            if (arr[i] == args[j]) {
                flag = false;
                break;
            }
        }
        if (flag) res.push(arr[i]);
    }
    return res;
}

var obj = { a: 1 }
var arrx = ['x']
var arrx2 = ['x']
var arr = [1, 2, obj, 3, 4, arrx, 5]
console.log(arrx == arrx2) // false
console.log(arrayDifference(arr, [4, obj, arrx2])) // [ 1, 2 , 3, ['x'], 5 ]
console.log(arrayDifferenceEs6(arr, [4, obj, arrx2])) // [ 1, 2 , 3, ['x'], 5 ]


// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.differenceBy(array, [values], [iteratee=_.identity])
// iteratee: Array Function Object String

// 这个方法类似_.difference ，除了它接受一个 iteratee （注：迭代器）， 调用array 和 values 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。iteratee 会调用一个参数：(value)。（注：首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值）。

// Note: 不像 _.pullAllBy，这个方法会返回一个新数组。

// 有问题 TODO
const arrayDifferenceByEs6 = (arr, args = [], interatee) => {
    if (!args.length) return arr;
    if (typeof interatee === 'function') {
        return arr.map(interatee).filter(v => !args.map(interatee).includes(v))
    }
    if (Array.isArray(interatee)) {
        let res1 = arr.filter(v => !interatee.includes(v));
        let res2 = args.filter(v => !interatee.includes(v));
        return res1.filter(v => !res2.includes(v));
    }
    if (Object.prototype.toString.call(interatee) === '[object Object]') { }
    if (typeof interatee === 'string') {
        arr = arr.filter(v => Object.prototype.toString.call(v) === '[object Object]');
        let res1 = arr.filter(v => {
            return Object.keys(v).includes(interatee)
        })
        console.log(res1)
        args = args.filter(v => Object.prototype.toString.call(v) === '[object Object]');
        let res2 = args.filter(v => {
            return Object.keys(v).includes(interatee)
        })
        console.log(res2)
        if (res2.length) {
            if (!res1.length) return arr
            let res = []
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < args.length; j++) {
                    if (!isObjectLike(arr[i], args[j])) {
                        res.push(arr[i])
                    }
                }
            }
            return res
        }
        return res1
    }
}

/**
 * 判断两个对象似否
 * @param {Object} obj1 
 * @param {Object} obj2 
 * @return {Object}
 */
const isObjectLike = (obj1, obj2) => {
    const key1 = Object.keys(obj1);
    const key2 = Object.keys(obj2);
    return key1.some(v => key2.includes(v) && obj1[v] === obj2[v]);
}

var o1 = { 'x': 1, y: 3 }
var o2 = { z: 3, y: 31 }
console.log(isObjectLike(o1, o2))


var arr = [3.1, 2.2, 1.3];
console.log(arrayDifferenceByEs6(arr, [4.4, 2.5], Math.floor)) // [ 3, 1 ]
console.log(arrayDifferenceByEs6([1, 2, 3, 4, 5], [3, 1], [5, 3])) // [ 2, 4 ]
// console.log(arrayDifferenceByEs6([1,2,3, 'x', {x: 1}], [2, {x: 2}], 'x')) // 

// console.log(arrayDifferenceByEs6([{ 'x': 1, y: 3 }, { 'x': 2 }], [{ 'x': 1 }], 'z'))
// console.log(arrayDifferenceByEs6([{ 'x': 1, z: 3 }, { 'x': 2 }], [{ 'x': 1 }], 'z'))
// console.log(arrayDifferenceByEs6([{ 'x': 1 }, { 'x': 2 }], [{ 'x': 1, z:2 }], 'z'))
// console.log(arrayDifferenceByEs6([{ 'x': 2, y: 3 }, { 'z': 2 }], [{ 'z': 1 }], 'z'))
// console.log(arrayDifferenceByEs6([{ 'x': 2, y: 3 }, { 'z': 2 }], [{ 'z': 2 }], 'z'))
console.log(arrayDifferenceByEs6([{ 'z': 2, y: 3 }, { 'x': 2 }], [{ 'z': 2 }], 'z'))





// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// —_.drop(array, [n=1])
// 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）

const arrayDropEs6 = (arr, n = 1) => {
    return n > 0 || n > arr.length ? arr.slice().splice(n) : arr;
}

function arrayDrop(arr, n) {
    n = n !== undefined ? n : 1;
    if (n < 1 || n > arr.length) return arr;
    var res = [];
    for (var i = n; i < arr.length; i++) {
        res.push(arr[i]);
    }
    return res;
}

var arr = [1, 2, 3, 4, 5]
console.log(arrayDrop(arr, 2)) // [ 3, 4, 5 ]
console.log(arrayDropEs6(arr, 2)) // [ 3, 4, 5 ]
console.log(arr) // [ 1, 2, 3, 4, 5 ]



// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.dropRight(array, [n=1])
// 创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）

const arrayDropRightEs6 = (arr, n = 1) => {
    return n > 0 ? n > arr.length ? [] : arr.slice().splice(0, arr.length - n) : arr;
}

function arrayDrop(arr, n) {
    n = n !== undefined ? n : 1;
    if (n < 0) return arr;
    if (n > arr.length) return [];
    var res = [];
    for (var i = 0; i < arr.length - n; i++) {
        res.push(arr[i]);
    }
    return res;
}

var arr = [1, 2, 3]
console.log(arrayDrop(arr, 2)) // [ 1 ]
console.log(arrayDropRightEs6(arr, 2)) // [ 1 ]
console.log(arr) // [ 1, 2, 3 ]


// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.dropRightWhile(array, [predicate=_.identity])

// predicate: Function

// 创建一个切片数组，去除array中从 predicate 返回假值开始到尾部的部分。predicate 会传入3个参数： (value, index, array)。

const arrayDropRightWhileEs6 = (arr, fn) => {
    if (typeof fn !== 'function') throw TypeError('fn is not a function')
    let flag = false;
    let index = -1;
    arr.reduceRight((acc, cur, i) => {
        if (flag) return
        if (!fn(cur)) {
            flag = true;
            index = i;
        }
    }, [])
    index = index == -1 ? arr.length : arr.length - index - 1;
    return arrayDrop(arr, index);
}

function arrayDropRightWhile(arr, fn) {
    if (typeof fn !== 'function') throw TypeError('fn is not a function')
    var index = -1;
    for (var j = arr.length - 1; j >= 0; j--) {
        if (!fn(arr[j])) {
            index = j;
            break;
        }
    }
    console.log(index)
    index = index == -1 ? arr.length : arr.length - index - 1;
    return arrayDrop(arr, index);
}

var users = [
    { 'user': 'barney', 'active': true },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': false },
    { 'user': 'userxxx', 'active': false },
];

console.log(arrayDropRightWhileEs6(users, v => !v.active)) // [{ 'user': 'barney', 'active': true }]
console.log(arrayDropRightWhile(users, v => !v.active)) // [{ 'user': 'barney', 'active': true }]

var arr = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arrayDropRightWhileEs6(arr, v => v > 3)) // [ 1, 2, 3 ]
console.log(arrayDropRightWhile(arr, v => v > 3)) // [ 1, 2, 3 ]


// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.fill(array, value, [start=0], [end=array.length])
// 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。

// Note: 这个方法会改变 array（注：不是创建新数组）。

const arrayFillEs6 = (arr, value, start = 0, end = arr.length) => {
    if (start < 0) start = arr.length + start;
    if (end < 0) end = arr.length + end;
    if (start > end) return arr;
    for (let i = start; i < end; i++) {
        arr[i] = value;
    }
    return arr;
}

var arr = [1, 2, 3]
console.log(arrayFillEs6(arr, 'a', 1, -1)) // [1, 'a', 3]



// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.findIndex(array, [predicate=_.identity], [fromIndex=0])
// predicate: Function Array Object string
// 该方法类似_.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。

const arrayFindIndex = (arr, fn, fromIndex = 0) => {
    if (fromIndex > arr.length || fromIndex < 0) return -1;
    let index = -1;
    for (let i = fromIndex; i < arr.length; i++) {
        if (fn(arr[i])) {
            index = i;
            break;
        }
    }
    return index;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 4]

console.log(arrayFindIndex(arr, o => o === 4, 1)) // 3



// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])
// 这个方式类似 _.findIndex， 区别是它是从右到左的迭代集合array中的元素。

const arrayFindLastIndex = (arr, fn, fromIndex = arr.length - 1) => {
    if (fromIndex > arr.length) return -1;
    if (fromIndex < 0) fromIndex = arr.length + fromIndex;
    let index = -1;
    for (let i = fromIndex; i >= 0; i--) {
        if (fn(arr[i])) {
            index = i;
            break;
        }
    }
    return index;
}

var arr = [1, 2, 3, 4, 5, 4, 6, 7, 4]

console.log(arrayFindLastIndex(arr, o => o === 4, 4))  // 3
console.log(arrayFindLastIndex(arr, o => o === 4, -1)) // 8
console.log(arrayFindLastIndex(arr, o => o === 4, -2)) // 5



// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.flattenDepth(array, [depth=1])
// 根据 depth 递归减少 array 的嵌套层级

const flattenDepth = (arr, depth = 1) => {
    console.log(arr)
    return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) && depth > 1 ? flattenDepth(cur, depth - 1) : cur), [])
}

var arr = [1, 2, 3, [4, 5, [6, [7]], [8], [9, 0]]];
console.log(flattenDepth(arr, 2)) // [ 1, 2, 3, 4, 5, 6, [ 7 ], 8, 9, 0 ]




// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.fromPairs(pairs)
// 与_.toPairs正好相反；这个方法返回一个由键值对pairs构成的对象。

const fromPairs = pairs => {
    let obj = {}
    for (let i = 0; i < pairs.length; i++) {
        obj[pairs[i][0]] = pairs[i][1];
    }
    return obj;
}

var arr = [['fred', 30], ['barney', 40]];

console.log(fromPairs(arr)) // { fred: 30, barney: 40 }



// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.uniq(array)
// 创建一个去重后的array数组副本。使用了 SameValueZero 做等值比较。只有第一次出现的元素才会被保留。

const uniq = arr => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}

var arr = [1, 2, 3, 1, 4, 2]
console.log(uniq(arr)) // [ 1, 2, 3, 4 ]



// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.union([arrays])
// 创建一个按顺序排列的唯一值的数组。所有给定数组的元素值使用SameValueZero做等值比较。（注： arrays（数组）的并集，按顺序返回，返回数组的元素是唯一的）

const union = (arr1, arr2) => {
    let res = arr1.slice();
    for (let i = 0; i < arr2.length; i++) {
        if (!arr1.includes(arr2[i])) {
            res.push(arr2[i]);
        }
    }
    return res;
}

var arr = [1, 2, 8, 9]
console.log(union(arr, [5, 2, 7, 1])) // [ 1, 2, 8, 9, 5, 7 ]



// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.unzip(array)
// 它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。（：返回数组的第一个元素包含所有的输入数组的第一元素，第一个元素包含了所有的输入数组的第二元素，依此类推。）

const unzip = arr => {
    let length = -1;
    let arr2 = arr.filter(Array.isArray);
    arr2.map(v => length = Math.max(length, v.length));
    let res = new Array(length);
    res.fill([]);
    let k = 0;
    while (k < arr2.length) {
        let val = []
        for (let i = 0; i < length; i++) {
            val.push(arr2[i][k]);
        }
        res[k] = val;
        k++;
    }
    return res;
}

var arr = [['fred', 'barney', 'summy'], [, 40], 11, [true, false]];
console.log(unzip(arr))


// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.zipObject([props=[]], [values=[]])
// 接受2个数组，第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。

const zipObject = (props = [], values = []) => {
    let obj = {};
    for (let i = 0; i < props.length; i++) {
        obj[props[i]] = values[i];
    }
    return obj;
}

var arr = ['a', null, 'c'];
var val = [1, , 2, 9];
console.log(zipObject(arr, val)) // { a: 1, null: undefined, c: 2 }





// ******************************************************************************************************************************
// *************************************************** 函数 **********************************************************************
// ******************************************************************************************************************************

// _.partial(func, [partials])
// 创建一个函数。 该函数调用 func，并传入预设的 partials 参数。 这个方法类似 _.bind，除了它不会绑定 this。

// 这个 _.partial.placeholder 的值，默认是以 _ 作为附加部分参数的占位符。

// 注意: 这个方法不会设置 "length" 到函数上。

const partial = (fn, ...args) => {
    return function (...args2) {
        return fn.apply(this, [...args, ...args2])
    }
}


var greet = function (greeting, name) {
    return greeting + ' ' + name;
};

var sayHelloTo = partial(greet, 'hello');
console.log(sayHelloTo('fred'));  // hello fred




// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.curry(func, [arity=func.length])
// 创建一个函数，该函数接收 func 的参数，要么调用func返回的结果，如果 func 所需参数已经提供，则直接返回 func 所执行的结果。或返回一个函数，接受余下的func 参数的函数，可以使用 func.length 强制需要累积的参数个数。

// _.curry.placeholder值，默认是以 _ 作为附加部分参数的占位符。

// Note: 这个方法不会设置 curried 函数的 "length" 属性。

// 进阶版
const curry = function (fn) {
    const length = fn.length; // 获取参数个数
    const args = Array.prototype.slice.call(arguments, 1);
    return function () {
        const restArgs = Array.prototype.slice.call(arguments);
        const newArgs = args.concat(restArgs);
        if (newArgs.length < length) {
            return curry.call(this, fn, ...newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}

var abc = (a, b, c, ...args) => {
    return [a, b, c, ...args];
};

console.log(curry(abc)(3)(4,1))  // [ 3, 4, 1 ]
console.log(curry(abc, 3)(1)(2,3,4,5,6))  // [ 3, 1, 2, 3, 4, 5, 6 ]





// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
// _.debounce(func, [wait=0], [options={}])
// 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。
// 一个周期内只会执行一次

const debounce = (fn, wait = 500, immediate = false) => {
    let timeout = null;
    return function() {
        if (timeout) clearTimeout(timeout);
        if (immediate) fn.apply(this, arguments);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait)
    }
}



// _.throtte(func, [wait=0], [options={}])
// 一个周期内规律性执行多次

const throtte = (fn, wait = 500) => {
    let timeout = null;
    return function() {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(this. arguments);
            }, wait);
        }
    }
}