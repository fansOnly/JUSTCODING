var a = '123456789.0128'
console.log(a.toLocaleString('en'))

console.log(formatNum(a))


var p1 = [1,2], p2 = {'a': 1, b: {b1: ['a'], b2: {}}}
var url = `http://google.com?a=1&b=2&c=${JSON.stringify(p1)}&d=${JSON.stringify(p2)}&f`
/**
 * 序列化url参数
 * @param {*} url 
 */
const serializeUrlParameter = url => {
    const paramStr = url.split('?')[1]
    const paramArr = paramStr.match(/([^?=&]+)(=?)([^&]*)/g)
    return paramArr.reduce((acc, cur) => {
        const [key, val] = cur.split('=')
        if (typeof val === 'undefined') {
            acc[key] = true
        } else {
            acc[key] = JSON.parse(val)
        }
        return acc
    }, {})
}

console.log(serializeUrlParameter(url))


/**
 * 生成指定长度随机字符串
 * @param {*} len 
 */
const createRandomString = len => {
    let str = Math.random().toString(36).substr(2)
    if (str.length > len) {
        return str.substr(0, len)
    }
    str += createRandomString(len - str.length)
    return str
}
console.log(createRandomString(32))


/**
 * 随机排序数组
 */
const arr = [1,6,45,23,788,12,9,983,2]
const randomSortArr = arr => {
    return arr.sort(() => Math.random() > 0.5 ? 1 : -1)
}
console.log(randomSortArr(arr))

const shuffSortArr = arr => {
    const temp = arr.slice()
    const result = []
    while (temp.length) {
        const randIdx = Math.floor(Math.random() * temp.length)
        result.push(arr[randIdx])
        temp.splice(randIdx, 1)
    }
    return result
}

console.log(shuffSortArr(arr))

const shuffSortArr2 = arr => {
    const { length } = arr
    if (length <= 1) return arr
    for (let i = 0; i < arr.length; i++) {
        const randIdx = Math.floor(Math.random() * (length - i)) + i;
        [arr[i], arr[randIdx]] = [arr[randIdx], arr[i]]
    }
    return arr
}

console.log(shuffSortArr2(arr))



function inheritPrototype(supClass, subClass) {
    subClass.prototype = Object.create(supClass.prototype)
    subClass.prototype.constructor = subClass
}


var s = 100

function f1() {
    var s = 200
    f2()
}

function f2() {
    console.log(s) // 100
}

function f3() {
    var s = 300
    var fn = function() {
        console.log(s) // 300
    }
    return fn
}

f1()

var f4 = f3()
f4()
