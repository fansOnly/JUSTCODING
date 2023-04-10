/**
 * 堆排序
 * 1、构造一个大顶堆 A[1...n]
 * 2、将堆顶元素 A[1] 与最后一个元素 A[n] 交换，得到一个新的有序区 A[n]，和新的无序区 A[1...n-1]
 * 3、将无序区 A[1...n-1]重新调整为大顶堆
 * 4、重复 2、3 步骤直至有序区的元素个数为 n-1，排序完成
 */
const heapSort = arr => {
  buildMaxHeap(arr)
  for (let i = arr.length - 1; i >= 0; i--) {
    swap(arr, 0, i)
    maxHeapify(arr, 0, i - 1)
  }
}

/**
 * 初始化大顶堆
 */
const buildMaxHeap = arr => {
  for (let i = arr.length >> 1; i >= 0; i--) {
    maxHeapify(arr, i, arr.length)
  }
}

/**
 * 构造大顶堆
 */
const maxHeapify = (arr, i, length) => {
  const left = 2 * i + 1, right = 2 * i + 2
  if (left > length || right > length) return
  let largest = i
  if (arr[left] > arr[largest]) {
    largest = left
  }
  if (arr[right] > arr[largest]) {
    largest = right
  }
  if (largest !== i) {
    swap(arr, i, largest)
    maxHeapify(arr, largest, length)
  }
}

const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
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

heapSort(arr)
console.log('堆排序', arr)


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const max = 100000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
shuffle(arr2)
console.log(`性能测试 - ${max} 条数据`)
console.time('heap sort time')
heapSort(arr2)
console.timeEnd('heap sort time')
