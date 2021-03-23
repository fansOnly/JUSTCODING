/**
 * binomialCoefficient - 二项式系数
 * Calculates the number of ways to choose k items form n items without repetition and without order.
 * 1. Use Number.isNaN() to check if any of the two values is NaN.
 * 2. Check if k is less than 0, greater than or equal to n, equal to 1 or n - 1 and return the appropriate result.
 * 3. Check if n - k is less than k and switch their values accordingly.
 * 4. Loop form 2 through k and Calculate the binomial coefficient.
 * 5. Use Math.round() to account for rounding errors in the calculation.
 */
const binomialCoefficient = (n, k) => {
    if (Number.isNaN(n) || Number.isNaN(k)) return NaN
    if (k < 0 || k > n) return 0
    if (k === 0 || k === n) return 1
    if (k === 1 || k === n - 1) return n
    if (n - k < k) k = n - k
    let res = n
    for (let i = 2; i <= k; i++) {
        res *= (n - i + 1) / i
    }
    return Math.round(res)
}

console.log(binomialCoefficient(8, 2)) // 28
