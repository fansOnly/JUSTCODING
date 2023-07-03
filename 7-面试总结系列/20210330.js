/**
 * 输入一个整数 N, 找出所有和为 N 的连续正数数列
 * N = 15 => [[1, 2, 3, 4, 5], [4, 5, 6], [7, 8]]
 * 1. 取中间值 8，取中间值以内的
 * 2. 连续求和公式： N + (N + 1) + ... + (N + M - 1) => (N + (N + M - 1)) * M / 2
 */
function fn(n) {
  const result = []
  const poivt = Math.ceil(n / 2)
  for (let i = 1; i <= poivt; i++) {
    for (let j = 2; ; j++) {
      const sum = (i + i + j - 1) * j / 2
      if (sum > n) {
        break
      } else if (sum === n) {
        result.push(createArr(i, j))
      }
    }
  }
  return result
}

function createArr(start, len) {
  return Array.from({length: len}).fill(start).map((v, i) => v + i)
}

console.log(fn(15))
