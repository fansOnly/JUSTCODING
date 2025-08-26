/**
 * 斐波那契数列
 * 1、暴力解法，时间 O(n^2) 空间 O(1)
 */
function fibonacci(n) {
  if (n < 2) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}


/**
 * 2、动态规划 自顶向下 时间 O(n) 空间 O(n)
 *  逻辑复用
 */
function fibonacci2(n) {
  let memo = new Array(n + 1).fill(-1)
  return dp2(memo, n)
}
function dp2(memo, n) {
  if (n < 2) return n
  if (memo[n] !== -1) return memo[n]
  memo[n] = dp2(memo, n - 1) + dp2(memo, n - 2)
  return memo[n]
}

// console.log(fibonacci2(15))

/**
 * 3、动态规划 自底向上 时间 O(n) 空间 O(n)
 *  逻辑复用
 */
function fibonacci3(n) {
  const memo = new Array(n+1).fill(-1)
  memo[0] = 0
  memo[1] = 1
  return dp3(memo, n)
}

function dp3(memo, n) {
  if (memo[n] !== -1) return memo[n]
  memo[n] = dp3(memo, n - 1) + dp3(memo, n - 2)
  return memo[n]
}
// console.log(fibonacci3(15))

function fibonacci4(n) {
  if (n < 2) return n
  const arr = [0, 1]
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[n]
}

// console.log(fibonacci4(15))

/**
 * 4、动态规划 - 空间优化为 O(1)
 */
function fibonacci5(n) {
  if (n < 2) return n
  let sum = 0
  let pre1 = 1, pre2 = 0
  for (let i = 2; i <= n; i++) {
    sum = pre1 + pre2
    pre2 = pre1
    pre1 = sum
  }
  return sum
}

// console.log(fibonacci5(15))

function fibonacci6(n, a = 0, b = 1) {
  if (n === 0) return a
  if (n === 1) return b
  return fibonacci6(n - 1, b, a + b)
}

// console.log(fibonacci6(15))