const bubbleSort = arr => {
  let swapped = false
  for (let i = 0; i < arr.length - 1; i++) {
    swapped = false
    for (let j = arr.length; j >= i + 1; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j - 1, j)
        swapped = true
      }
    }
    if (!swapped) return
  }
}

const swap = (arr, i, j) => {
  let temp = arr[j]
  arr[j] = arr[i]
  arr[i] = temp
}

const arr = Array.from({ length: 15 }, (_, i) => (i + 1))
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * i)
      ;[arr[i], arr[r]] = [arr[r], arr[i]]
  }
}
shuffle(arr)
console.log('洗牌', arr)

bubbleSort(arr)
console.log('冒泡排序', arr)

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const max = 100000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
shuffle(arr2)
console.log(`性能测试 - ${max} 条数据`)
console.time('bubble sort time')
bubbleSort(arr2)
console.timeEnd('bubble sort time')
