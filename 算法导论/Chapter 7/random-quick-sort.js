/**
 * 快速排序的随机化版本
 * 1. 通过随机抽样(random sampling)的技术
 * 2. 支持有序数组的排序
 * 3. 时间复杂度稳定在 O(n*lgn)
 */
const randomQuickSort = (arr, p = 0, r = arr.length - 1) => {
  if (p < r) {
    const q = randomPartition(arr, p, r)
    randomQuickSort(arr, p, q - 1)
    randomQuickSort(arr, q + 1, r)
  }
}

/**
 * 随机抽样
 */
const randomPartition = (arr, p, r) => {
  const i = p + ~~(Math.random() * (r - p))
  swap(arr, i, r)
  return partition(arr, p, r)
}

const partition = (arr, p, r) => {
  const x = arr[r]
  let i = p - 1
  for (let j = p; j < r; j++) {
    if (arr[j] <= x) {
      i++
      swap(arr, i, j)
    }
  }
  swap(arr, i + 1, r)
  return i + 1
}

const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('测试算法')
const arr = Array.from({ length: 15 }, (_, i) => (i + 1))
arr.push(9, 12)
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * i)
      ;[arr[i], arr[r]] = [arr[r], arr[i]]
  }
}
shuffle(arr)
console.log('洗牌', arr)

randomQuickSort(arr)
console.log('随机快速排序', arr)

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const max = 10000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
// shuffle(arr2)
console.log(`性能测试 - ${max} 条数据`)
console.time('random quick sort time')
randomQuickSort(arr2)
console.timeEnd('random quick sort time')
