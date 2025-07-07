/**
 * fibonacci - 斐波那契数列
 * Generates an array, containing the Fibonacci sequence, up until the nth term.
 * 1. Use Array.from() to create an empty array of the specific length, initializing the first two values (0 and 1).
 * 2. Use Array.prototype.reduce() and Array.prototype.concat() to add values into the array, using the sum of the last two values, except for the first two.
 */
const fibonacci = n => {
    return Array.from({length: n}).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), [])
}

console.log(fibonacci(6)) // [ 0, 1, 1, 2, 3, 5 ]


function fibonacci6(n, a = 0, b = 1) {
if (n === 0) return a
if (n === 1) return b
return fibonacci6(n - 1, b, a + b)
}

console.log(fibonacci6(10)) // 55
