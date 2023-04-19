/**
 * 钢条切割 - 暴力求解，自顶向下递归实现
 * 时间复杂度：T(n) = 2^n，n 的指数函数
 */
const cutRod = (arr, n) => {
  if (n === 0) return 0
  let max = 0
  for (let i = 1; i <= n; i++) {
    max = Math.max(max, arr[i] + cutRod(arr, n - i))
  }
  return max
}

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('算法测试')
const arr = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30]
console.log(cutRod(arr, 4))
