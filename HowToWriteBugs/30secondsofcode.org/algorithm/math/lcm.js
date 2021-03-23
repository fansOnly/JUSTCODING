/**
 * lcm - 最小公倍数
 * Calculates the least common mutiple of two or more numbers.
 * 1. Use the greatest common divisor(gcd) formular and the fact that lcm(x, y) = x * y / gcd(x, y) to determine the least comon mutiple.
 * 2. The GCDformular use recursion.
 */
const lcm = (...arr) => {
    const gcd = (x, y) => !y ? x : gcd(y, x % y)
    const _lcm = (x, y) => x * y / gcd(x, y)
    return [...arr].reduce((a, b) => _lcm(a, b))
}

console.log(lcm(12, 7)) // 84

console.log(lcm(...[1, 3, 4, 5])) // 60
