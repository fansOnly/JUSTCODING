/**
 * 动态规划 - 自底向上
 * 1. 若 i < j，则规模为 i 的子问题比规模为 j 的子问题更小
 * 2. 一次求解规模为 j = 0,1,...,n 的子问题
 * 3. 时间复杂度：O(n^2)
 */
const bottomUpCutRod = (arr, n) => {
  const cache = new Map()
  cache.set(0, 0)
  for (let i = 1; i <= n; i++) {
    let max = 0
    for (let j = 1; j <= i; j++) {
      max = Math.max(max, arr[j] + cache.get(i - j))
    }
    cache.set(i, max)
  }
  return cache.get(n)
}

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('算法测试')
const arr = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30]
const n = 4
console.log(bottomUpCutRod(arr, n))
