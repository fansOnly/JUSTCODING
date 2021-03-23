/**
 * 斐波那契数列
 * 一、非递归模式
 */
function fibonacci(n) {
    if (n < 2) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(5))


/**
 * 二、尾递归优化
 */
function fibonacci2(n, a = 1, b = 1) {
    if (n < 2) return b
    return fibonacci2(n - 1, b, a + b)
}

console.log(fibonacci2(5))


/**
 * 三、使用迭代??
 */
// function fibonacci3(n) {
//     let a = 0, b = 1, c = a + b
//     for (let i = 3; i < n; i++) {
//         a = b
//         b = c
//         c = a + b
//     }
//     return c
// }

// console.log(fibonacci3(5))
