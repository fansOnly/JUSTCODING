/**
 * gcd 最大公约数
 * Calculates the greatest common divisor between two or more numbers/arrays.
 * 1. The inner _gcd function uses recursion(递归).
 * 2. Base case is when y equals 0. In this case, return x.
 * 3. Otherwise, return the GCD of y and the remainder of the division x/y.
 */
const gcd = (...arr) => {
    const _gcd = (x, y) => (!y ? x : gcd(y, x % y))
    return [...arr].reduce((a, b) => _gcd(a, b))
}

console.log(gcd(8, 36)) // 4
console.log(gcd(...[12, 8, 32])) // 4
