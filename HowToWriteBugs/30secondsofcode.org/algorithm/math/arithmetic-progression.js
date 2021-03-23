/**
 * arithmeticProgression - 等差数列
 * Creates an array of numbers in the arithmetic progression, starting with the given positive integer and up to the specified limit.
 * 1. Use Array.from() to create an array of the desired length, lim/n, and a map function to fill it with the desired values in the given range.
 */
const arithmeticProgression = (n, limit) => {
    return Array.from({length: Math.ceil(limit / n)}, (_, i) => (i + 1) * n)
}

console.log(arithmeticProgression(5, 25)) // [ 5, 10, 15, 20, 25 ]
