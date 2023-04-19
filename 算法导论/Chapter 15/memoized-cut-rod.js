/**
 * 钢条切割 - 动态规划 - 带备忘的自顶向下法
 * 1. 对于已经求解过的子问题的结果，保存起来
 * 2. 时间复杂度：O(n^2)
 */
const memoizedCutRod = (arr, n) => {
  const cache = new Array(n + 1)
  return memoizedCutRodAux(arr, n, cache)
}

const memoizedCutRodAux = (arr, n, cache) => {
  if (n === 0) return 0
  if (cache[n] >= 0) return cache[n]
  let max = 0
  for (let i = 1; i <= n; i++) {
    max = Math.max(max, arr[i] + memoizedCutRodAux(arr, n - i, cache))
  }
  cache[n] = max
  return max
}

const memoizedCutRod2 = (arr, n, cache = new Map()) => {
  if (n === 0) return 0
  if (cache.has(n)) return cache.get(n)
  let max = 0
  for (let i = 1; i <= n; i++) {
    max = Math.max(max, arr[i] + memoizedCutRod2(arr, n - i, cache))
  }
  cache.set(n, max)
  return max
}

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('算法测试')
const arr = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30]
const n = 4
console.log(memoizedCutRod(arr, n))
console.log(memoizedCutRod2(arr, n))
