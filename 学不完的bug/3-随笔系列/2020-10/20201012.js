console.log(Math.ceil(5.1)) // 6

console.log(~~(-1.18)) // -1

console.log(-1.18 | 0) // -1


/**
 * 惰性载入函数
 */
function foo() {
    if (a != b) {
        foo = function () {
            return 'aaa'
        }
    } else {
        foo = function() {
            return 'bbb'
        }
    }
    return foo()
}


const a = 1, b = 2

console.log(foo()) // aaa


/**
 * 初始化
 */
let x = 0
function bar() {
    x++
    console.log('once')
    bar = function() {
        x = 2
        console.log('bar')
    }
}


bar() // once
console.log(x) // 1
bar() // bar
console.log(x) // 2
bar() // bar
console.log(x) // 2





/**
 * 时间字符串直接比较
 */
// ps  字符串比较大小是按照字符串从左到右每个字符的 charCode来的，注意补0
console.log('2020-01-16' > '2020-01-15') // true





/**
 * 精确到指定位数的小数
 * @param {*} n 
 * @param {*} decimail 
 */
const round = (n, decimail = 0) => Number(`${Math.round(`${n}e${decimail}`)}e-${decimail}`)

console.log(round(1.3333, 2)) // 2



/**
 * 数字补0技
 */
const addZero = (num, len = 2) => `0${num}`.slice(-len)

console.log(addZero(1)) // 01
console.log(addZero(10, 3)) // 010


const addZero2 = (num, len = 2) => num.toString().padStart(len, 0)

console.log(addZero2(1)) // 01
console.log(addZero2(22, 4)) // 0022



/**
 * 交互数值方式
 */
// 1
let m = 1, n = 2;
[m , n] = [n, m];
console.log(m,n) // 2 1

// 2
var m1 = 1, m2 = 2
var temp
temp = m1
m1 = m2
m2 = temp
console.log(m1, m2) // 2 1

// 3
var n1 = 1, n2 = 2
var n2 = [n1, n1 = n2][0]
console.log(n1, n2) // 2 1

// 4
var c1 = 1, c2 = 2
c1 = c1 + c2
c2 = c1 - c2
c1 = c1 - c2
console.log(c1, c2) // 2 1
