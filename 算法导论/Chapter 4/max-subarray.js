/**
 * 求解一个数组中的最大子数组
 * 方法一：分治策略
 * 场景：一组股票走势图，分析最低买入点和最高卖出点
 * 分析：数组 A[low...high] 中的任意连续子数组  A[i...j] 的位置满足
 * 1、位于子数组 A[low...mid] 中，满足 low <= i <= j <= mid
 * 2、位于子数组 A[mid + 1, high] 中，满足 mid < i <= j <= high
 * 3、跨域中点 mid，满足 low <= i <= mid < j <= high
 */

/**
 * 获取跨域中点的结果
 * 分解：
 * 1、获取左子数组的最大和与位置
 * 2、获取右子数组的最大和与位置
 * 3、返回左、右位置与最大和
 */
const findMaxCrossingSubarray = (arr, low, mid, high) => {
  let sum = 0
  let leftSum = 0, rightSum = 0
  let maxLeftIdx = 0, maxRightIdx = 0
  for (let i = mid; i > low; i--) {
    sum += arr[i]
    if (sum > leftSum) {
      leftSum = sum
      maxLeftIdx = i
    }
  }
  sum = 0
  for (let i = mid + 1; i < high; i++) {
    sum += arr[i]
    if (sum > rightSum) {
      rightSum = sum
      maxRightIdx = i
    }
  }
  return { begin: maxLeftIdx, end: maxRightIdx, sum: leftSum + rightSum }
}

const findMaximumSubarray = (arr, low = 0, high = arr.length) => {
  if (high === low) return { begin: low, end: high, sum: arr[low] }
  const mid = (low + high) >> 1
  const leftData = findMaximumSubarray(arr, low, mid)
  const rightData = findMaximumSubarray(arr, mid + 1, high)
  const crossData = findMaxCrossingSubarray(arr, low, mid, high)
  if (leftData.sum >= rightData.sum && leftData.sum >= crossData.sum) {
    return leftData
  } else if (rightData.sum >= leftData.sum && rightData.sum >= crossData.sum) {
    return rightData
  } else {
    return crossData
  }
}

const arr = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
// 当数组所有元素均为负数时
// 返回 0
// const arr = [-13, -3, -25, -20, -3, -16, -23, -18, -20, -7, -12, -5, -22, -15, -4, -7]
console.log('递归', findMaxCrossingSubarray(arr, 0, arr.length >> 1, arr.length))
console.log('分治', findMaximumSubarray(arr))


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * i)
      ;[arr[i], arr[r]] = [arr[r], arr[i]]
  }
}
const max = 100000
const arr2 = Array.from({ length: 100 }, (_, i) => `${Math.random() > 0.5 ? '' : '-'}${i + 1}`).map(Number)
shuffle(arr2)
console.log(`性能测试 - ${max} 条数据`)
console.time('find maximum subarray time')
const res2 = findMaximumSubarray(arr2)
console.timeEnd('find maximum subarray time')
console.log('最大子数组', res2)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.time('find maximum subarray time2')
const res3 = findMaxCrossingSubarray(arr2, 0, arr2.length >> 1, arr2.length)
console.timeEnd('find maximum subarray time2')
console.log('最大子数组', res3)
