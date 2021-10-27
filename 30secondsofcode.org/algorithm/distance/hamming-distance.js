/**
 * hammingDistance 汉明距离
 * Calculates the Hamming distance between two values.
 * 1. Use the OXR operator(^) to find the bit distance between the two numbers.
 * 2. Convert to a binary string using Number.prototype.toString(2).
 * 3. Count and return the number of 1_s in the string, using String.prototype.match(/1/g)
 */
const hammingDistance = (a, b) => {
    return ((a ^ b).toString(2).match(/1/g) || '').length
}

console.log(hammingDistance(2, 3)) // 1
