const selectionSort = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    swap(arr, minIndex, i)
  }
}

const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
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

selectionSort(arr)
console.log('升序', arr)

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const max = 100000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
shuffle(arr2)
console.log(`性能测试 - ${max} 条数据`)
console.time('t')
selectionSort(arr2)
console.timeEnd('t')
