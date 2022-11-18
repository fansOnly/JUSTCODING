// 当 + 用在连接字符串时，当一个对象既有toString又有valueOf的时候，盲目通过valueOf来解决这种含糊
var s = '' + { valueOf: () => 'v', toString: () => 's' }
console.log(s) // v

// 对象通过valueOf转换为数字，通过toString转换为字符串


// 双位运算符 ~~，速度比Math.floor和Math.ceil快
console.log(~~2.5, Math.floor(2.5)) // 2
console.log(~~-2.5, Math.ceil(-2.5)) // -2

// 取整
console.log(-3.5 | 0) // -3
console.log(3.5 | 0) // 3
