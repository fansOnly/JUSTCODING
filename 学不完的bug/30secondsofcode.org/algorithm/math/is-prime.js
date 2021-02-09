/**
 * isPrime - 是否素数
 * Check if the provided integer is a prime number.
 * 1. Check number from 2 to the squre root of the given number.
 * 2. Returns false if any of them devides the given number, else return true, unless the number is less than 2.
 */
const isPrime = num => {
    const boundary = Math.floor(Math.sqrt(num))
    for (let i = 2; i <= boundary; i++) {
        if (num % i === 0) return false
    }
    return num >= 2
}

console.log(isPrime(11)) // true

console.log(isPrime(1)) // false

