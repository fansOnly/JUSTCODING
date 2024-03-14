/**
 * 递归解法
 */
function fib1(n) {
  if (n <= 2) return 1;
  return fib1(n - 1) + fib1(n - 2)
}

// n1 = 1
// n2 = 1
// n3 = n2 + n1 = 2
// n4 = n3 + n2 = 3
// n5 = n4 + n3 = 5

/**
 * 尾递归解法
 */
function fib2(n, s = 0, t = 1) {
  if (n < 2) return t
  return fib2(n - 1, t, s + t)
}


/**
 * 动态规划解法
 * 状态转移!!
 */
function fib3(n) {
  if (n < 2) return 1
  const arr = [0, 1]
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[n]
}

// a2 = a1 + a0 = 1
// a3 = a2 + a1 = 2
// a4 = a3 + a2 = 3
// a5 = a4 + a3 = 5


console.time('cursive')
console.log(fib1(5))
console.timeEnd('cursive')

console.time('tail-cursive')
console.log(fib2(5))
console.timeEnd('tail-cursive')

console.time('dynamic-programming')
console.log(fib3(5))
console.timeEnd('dynamic-programming')