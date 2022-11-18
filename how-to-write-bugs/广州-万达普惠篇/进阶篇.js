// =======================================================================================================
// ============================================= 提升篇 ==================================================
// =======================================================================================================

// 1 判断一个数为偶数
const isEven = num => {
    if (num < 0 || num === 1) return false
    if (num === 0) return true
    return isEven(num - 2)
}

// 按位 & 运算符, 转换为二进制计算再返回十进制
const isEven2 = num => !(num & 1)

console.log(isEven(0), isEven2(0))
console.log(isEven(1), isEven2(1))
console.log(isEven(4), isEven2(4))


// 2 判断一个对象是否为数组
// a Array.isArray()
// b Object.prototype.toString.call(val) === '[object Array]'
// c val instancsof Array


// 3 判断一个值为 NaN
// a isNaN
console.log(isNaN(NaN))
console.log(isNaN(parseInt('')))

// 不合理的判断结果
console.log(isNaN())
console.log(isNaN(undefined))
console.log(isNaN({}))
console.log(isNaN(() => {}))
console.log(isNaN(String('a')))

// b es6: Number.isNaN
console.log(Number.isNaN(NaN))
console.log(Number.isNaN(parseInt('')))

console.log(Number.isNaN())

// c NaN 是唯一的值, 它不等于自己
function ifIsNaN(val) {
    return val !== val
}

console.log(ifIsNaN(NaN))
console.log(ifIsNaN(parseInt('')))

console.log(ifIsNaN())