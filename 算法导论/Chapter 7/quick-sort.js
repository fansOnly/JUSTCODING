/**
 * 快速排序 - 分治思想
 * 特性：
 * 1. 实现原址重排
 * 2. 平均性能好，期望时间复杂度 O(n*lgn)，最差 O(n^2)
 * 实现：
 * 1. 分解：将数组 A[p..r] 划分为两个（可能为空）的子数组，其中
 *        A[p..q-1] 中的每个元素都小于等于 A[q]
 *        A[q+1..r] 中的每个元素都大于等于 A[q]
 * 2. 解决：递归调用快排，对子数组 A[p..q-1] A[q+1..r] 进行排序
 * 3. 合并：子数组都是原址排序，不需要合并操作
 * 总结：
 * 1. 对于有序的数组，快排的时间复杂度会变为 O(n^2)
 */
const quickSort = (arr, p = 0, r = arr.length - 1) => {
  if (p < r) {
    const q = partition(arr, p, r)
    quickSort(arr, p, q - 1)
    quickSort(arr, q + 1, r)
  }
}

/**
 * 实现数组的划分 q
 */
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
quickSort(arr)
console.log('快速排序', arr)


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const formatMax = value => {
  const texts = ['十', '百', '千', '万', '十万', '百万', '千万', '亿']
  return String(value).replace(/^([1-9])(0+)$/g, (_, p1, p2) => {
    return ([1, 5].includes(p2.length) ? '' : p1) + texts[p2.length - 1]
  })
}
const max = 1000000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
shuffle(arr2)
console.log(`性能测试 - ${formatMax(max)} 条数据`)
console.time('quick sort time')
quickSort(arr2)
console.timeEnd('quick sort time')
