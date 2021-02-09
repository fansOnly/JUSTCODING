/**
 * factorial - 阶乘
 * Calculates the factorial of a number.
 * 1. Use recursion.
 * 2. If n is less or equal to 1, return 1.
 * 3. Otherwise, return the product of n and the factorial of n - 1.
 * 4. Throw a TypeError if n is a negative number.
 */
const factorial = n => {
    return n < 0 ? (() => {
        throw new TypeError('Negative numbers are not allowed.')
    })() : (n <= 1 ? 1 : n * factorial(n-1))
}

console.log(factorial(6)) // 720
