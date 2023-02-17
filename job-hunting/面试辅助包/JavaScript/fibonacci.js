function fibonacci(n) {
  if (n < 2) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}


function fibonacci2(n, start = 1, total = 1) {
  if (n < 2) return total
  return fibonacci2(n - 1, total, start + total)
}

console.time()
console.log(fibonacci(7))
console.timeEnd()
console.time()
console.log(fibonacci2(7))
console.timeEnd()
