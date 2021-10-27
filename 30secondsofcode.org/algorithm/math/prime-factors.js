/**
 * primeFactors
 * Finds the prime factors of a given number using the trial division algorithm.
 * 1. Use a while loop to iterate over all possible prime factors, starting with 2.
 * 2. If the current factor f, exactly divides f, add f to the factors array and dividen n by f. Otherwise, increament f by one.
 */
const primeFactors = n => {
    let a = [], f = 2
    while (n > 1) {
        if (n % f === 0) {
            a.push(f)
            n /= f
        } else {
            f++
        }
    }
    return a
}

console.log(primeFactors(147)) // [ 3, 7, 7 ]
