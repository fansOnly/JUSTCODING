/**
 * 初级版
 */
function isPrimeNum(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false
  }
  return true
}

/**
 * 优化版
 */
function isPrimeNum2(num) {
  const sqrt = parseInt(Math.sqrt(num))

  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) return false
  }
  return true
}
