const shuffle = (arr) => {
  for (let i = arr.length; i > 0; i--) {
    const r = ~~(Math.random() * i)
      ;[arr[i - 1], arr[r]] = [arr[r], arr[i - 1]]
  }
  return arr
}

const arr = [1, 2, 3, 4, 5, 7, 8, 9, 11]
console.time()
console.log(shuffle(arr))
console.timeEnd()

/**
 * 优化版
 */
const shuffle2 = arr => {
  let r, n = arr.length
  while (n > 0) {
    r = (Math.random() * n--) >>> 0
      ;[arr[n], arr[r]] = [arr[r], arr[n]]
  }
  return arr
}
console.time()
console.log(shuffle2(arr))
console.timeEnd()
