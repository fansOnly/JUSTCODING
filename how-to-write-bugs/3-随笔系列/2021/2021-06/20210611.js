function fn1(n) {
  return n > 0 && (n & (n-1)) === 0
}

console.log(fn1(1))
