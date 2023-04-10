/**
 * 非递归二分查找
 */
const iterativeBinarySearch = (arr, value, low = 0, high = arr.length) => {
  let mid
  while (low <= high) {
    mid = (low + high) >> 1
    if (arr[mid] === value) {
      return mid
    } else if (arr[mid] > value) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return -1
}

/**
 * 递归二分查找
 */
const recursiveBinarySearch = (arr, value, low = 0, high = arr.length) => {
  if (low > high) return -1
  const mid = (low + high) >> 1
  const middle = arr[mid]
  if (middle === value) {
    return mid
  } else if (middle < value) {
    return recursiveBinarySearch(arr, value, mid + 1, high)
  } else {
    return recursiveBinarySearch(arr, value, low, mid - 1)
  }
}

const arr = Array.from({ length: 15 }, (_, i) => (i + 1))
const res1 = iterativeBinarySearch(arr, 11)
const res2 = recursiveBinarySearch(arr, 11)
console.log('非递归查找', res1)
console.log('递归查找', res2)


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const max = 100000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
console.log(`性能测试 - ${max} 条数据`)
console.time('t1')
const res3 = iterativeBinarySearch(arr2, 85653)
console.timeEnd('t1')
console.log('非递归查找', res3)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.time('t2')
const res4 = iterativeBinarySearch(arr2, 85653)
console.timeEnd('t2')
console.log('递归查找', res4)
