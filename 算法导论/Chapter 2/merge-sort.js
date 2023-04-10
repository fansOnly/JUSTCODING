/**
 * 
 * @param {*} arr array
 * @param {*} p left begin index at p
 * @param {*} q left end index at q
 *              right start index at q + 1
 * @param {*} r right end index at r
 */
const merge = (arr, p, q, r) => {
  const left = arr.slice(p, q + 1)
  const right = arr.slice(q + 1, r + 1)
  let i = 0, j = 0, k = p
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i]
      i++
    } else {
      arr[k] = right[j]
      j++
    }
    k++
  }
  if (i < left.length) {
    arr[k++] = left[i++]
  } else if (j < right.length) {
    arr[k++] = right[j++]
  }
}

/**
 * 
 * @param {*} arr array
 * @param {*} p begin index at p, default to be 0
 * @param {*} r end index at r, default to be arr.length - 1
 */
const mergeSort = (arr, p = 0, r = arr.length - 1) => {
  // 0 or 1 element
  if (p >= r) return
  const q = (p + r) >> 1
  mergeSort(arr, p, q)
  mergeSort(arr, q + 1, r)
  merge(arr, p, q, r)
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

mergeSort(arr)
console.log('升序', arr)


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const max = 100000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
shuffle(arr2)
console.log(`性能测试 - ${max} 条数据`)
console.time('merge sort time')
mergeSort(arr2)
console.timeEnd('merge sort time')
