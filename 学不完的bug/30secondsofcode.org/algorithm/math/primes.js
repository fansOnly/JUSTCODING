/**
 * primes - 找出给定数字以内的全部质数
 * Generates primes up to a given number, using the Sieve of Ertosthenes.
 * 1. Generate an array from 2 to the given number.
 * 2. Use Array.prototype.filter() to filter out the values divisible by any number from 2 to the square root of the provided number.
 */
const primes = num => {
    let arr = Array.from({length: num - 1}, (v, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({length: sqroot - 1}, (v ,i) => i + 2)
    numsTillSqroot.forEach(x => arr = arr.filter(y => y % x !== 0 || y === x))
    return arr
}

console.log(primes(10)) // [ 2, 3, 5, 7 ]
