const insertionSortReverse = (arr) => {
  let j, key
  for (let i = 1; i < arr.length; i++) {
    key = arr[i]
    j = i - 1
    while (j >= 0 && arr[j] < key) {
      arr[j + 1] = arr[j]
      j -= 1
    }
    arr[j + 1] = key
  }
}

const arr = Array.from({ length: 20 }, (_, i) => (i + 1))
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * i)
      ;[arr[i], arr[r]] = [arr[r], arr[i]]
  }
}
shuffle(arr)
console.log('洗牌', arr)

insertionSortReverse(arr)
console.log('降序', arr)
