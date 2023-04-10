/**
 * 普通查找
 */
const sumSearch = (arr, sum) => {
  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        return [i, j]
      }
    }
  }
  return []
}

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

/**
 * 二分查找优化
 * n * log(n)
 */
const sumBinarySearch = (arr, sum) => {
  for (let i = 0; i < arr.length; i++) {
    const matchIdx = recursiveBinarySearch(arr, sum - arr[i], i + 1, arr.length)
    if (matchIdx > -1) {
      return [i, matchIdx]
    }
  }
  return []
}

const arr = Array.from({ length: 15 }, (_, i) => (i + 1))
const res1 = sumSearch(arr, 23)
console.log('普通查找', res1)
const res2 = sumBinarySearch(arr, 23)
console.log('二分查找', res2)


console.log(sumSearch([-9, -5, -1, 3, 12, 30, 31, 56, 75], 55))
console.log(sumBinarySearch([-9, -5, -1, 3, 12, 30, 31, 56, 75], 55))

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const max = 100000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
console.log(`性能测试 - ${max} 条数据`)
console.time('t1')
const res3 = sumSearch(arr2, 183756)
console.timeEnd('t1')
console.log('普通查找', res3)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.time('t2')
const res4 = sumBinarySearch(arr2, 183756)
console.timeEnd('t2')
console.log('二分查找', res4)
