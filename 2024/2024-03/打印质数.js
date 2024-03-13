function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false
  }
  return num > 1
}


console.log(isPrime(2))

function getPrime() {
  let current = 2
  return function() {
    while (true) {
      if (isPrime(current)) {
        const prime = current
        current++
        return prime
      }
      current++
    }
  }
}

const getNextPrime = getPrime()
console.log(getNextPrime())
console.log(getNextPrime())
console.log(getNextPrime())