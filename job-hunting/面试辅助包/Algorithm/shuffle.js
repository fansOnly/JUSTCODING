/**
 * 洗牌算法
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const index = ~~(Math.random() * i + 1)
      ;[arr[i], arr[index]] = [arr[index], arr[i]]
  }
  return arr
}

const arr = [1, 2, 3, 4, 5, 6, 7]
console.log(shuffle(arr))
