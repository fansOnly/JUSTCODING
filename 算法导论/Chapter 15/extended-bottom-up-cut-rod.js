/**
 * 钢条切割 - 重构最优解
 * 1. 返回最优收益值
 * 2. 返回切割方案
 */
const extendedBottomUpCutRod = (arr, n) => {
  const cache = new Map()
  cache.set(0, 0)
  const solution = new Map()
  for (let i = 1; i <= n; i++) {
    let max = 0
    for (let j = 1; j <= i; j++) {
      if (max < arr[j] + cache.get(i - j)) {
        max = arr[j] + cache.get(i - j)
        solution.set(i, j)
      }
    }
    cache.set(i, max)
  }
  return {
    value: cache,
    solution
  }
}
const printCutRodSolution = (arr, n) => {
  const { value, solution } = extendedBottomUpCutRod(arr, n)
  while (n > 0) {
    console.log(`切割一个长度为 ${solution.get(n)} 的钢条，收益为 ${arr[solution.get(n)]}`)
    n -= solution.get(n)
  }
}

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('算法测试')
const arr = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30]
const n = 5
const { value } = extendedBottomUpCutRod(arr, n)
console.log(`长度为 ${n} 的钢条的最优收益为：${value.get(n)} `)
printCutRodSolution(arr, n)
