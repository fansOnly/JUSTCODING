/**
 * json - 一种简单而优秀的数据结构
 */

/**
 * I. json 实现简单的深拷贝
 */
const deepCopy = data => JSON.parse(JSON.stringify(data))

var obj = {
    a: 1,
    b: {
        b1: { kk: 3},
        b2: [1,2]
    }
}

var copy = deepCopy(obj)
console.log(obj === copy) // false


/**
 * II. 序列化
 * json.stringify(value[, replacer[, space]])
 * @param {String} value 转化为json的值
 * @param {Function|Array|null} replacer
 * 如果是函数，被序列化的每个值都会经过这个函数处理
 * 如果是数组，则只有包含在数组内的属性名会显示在结果中
 * 如过是null或者未提供，所有的属性都会被序列化
 * @param {String|Number} space 缩进的空白字符串
 * 如果是一个数字，则会多缩进该数值的空格 - 最多10个空格
 * 如果是一个字符串，则会多缩进该字符串 - 或者该字符串的前10个字符
 */
var obj = {
    a: 1,
    b: '2',
    c: []
}
const p1 = JSON.stringify(obj)
console.log(p1)

const p2 = JSON.stringify(obj, (key, val) => {
    // 在开始时, replacer 函数会被传入一个空字符串作为 key 值，代表着要被 stringify 的这个对象。随后每个对象或数组上的属性会被依次传入
    console.log(val)
    return val
})
console.log(p2)

const p3 = JSON.stringify(obj, ['a'])
console.log(p3)


/**
 * III. toJSON 方法
 * 对象的 toJSON 方法会覆盖对象的序列化行为，调用 toJSON 后的返回值会被序列化
 */
var obj = {
    foo: 'foo',
    toJSON() {
        return 'bar'
    }
}

console.log(JSON.stringify(obj)) // "bar"
