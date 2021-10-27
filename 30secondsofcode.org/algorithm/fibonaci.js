
/**
 * 斐波那契数列
 * [1, 1, 2, 3, 5, 8, 13, 21, 34]
 * 第一项为1，第二项为1
 * 下一项为前两项的和
 */
function fibonaci0(n) {
  if (n < 1) return n
  let arr = [1, 1] // 数列的前两个数
  let i = n + 1 - 2 // 当前需要继续创建的数组个数
  while (i > 0) {
    const a = arr[arr.length - 2] // 获取当前项的前第二项
    const b = arr[arr.length - 1] // 获取当前项的前第一项
    arr.push(a + b) // 创建当前项
    i--
  }
  return arr[arr.length - 1]
}

console.log(fibonaci0(5))

function fibonaci(n) {
  if (n < 2) return 1
  return fibonaci(n - 1) + fibonaci(n - 2)
}

console.log(fibonaci(5))


function fibonaci2(n, cur = 1, next = 1) {
  if (n < 2) return cur
  return fibonaci(n - 1, next, cur + next)
}

console.log(fibonaci(5))
