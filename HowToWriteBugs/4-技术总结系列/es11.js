/**
 *  bigInt
 */
// 1. 创建
var a = 10000n
var b = BigInt(10000)


// 2. 运算
// 除了一元运算 +
console.log(a + b) // 20000n
console.log(a - b) // 0n
// console.log(+ a) // Cannot convert a BigInt value to a number
console.log(5n % 3n) // 2

// 进行除法运算时会取整，等同于 ~~ 运算符
console.log(25n / 10n) // 2
console.log(-29n / 10n) // -2

// 转换布尔值
console.log(!!1n) // true
console.log(!!0n) // false
