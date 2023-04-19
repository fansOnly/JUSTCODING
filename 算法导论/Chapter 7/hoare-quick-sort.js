/**
 * 原始版本
 */
const quickSort = (arr, p = 0, r = arr.length - 1) => {
  if (p < r) {
    const q = hoarePartition(arr, p, r)
    quickSort(arr, p, q - 1)
    quickSort(arr, q + 1, r)
  }
}

/**
 * 由 Hoare 提出的划分算法
 * 1. 设置主元为 A[p]
 * 2. 第二个 while 循环是寻找右半部分小于主元的位置 j
 * 3. 第三个 while 循环是寻找左半部分大于主元的位置 i
 * 4. 如果 i < j，交换两者位置
 * 5. 最终数组左半部分都小于主元，右半部分都大于主元
 * 6. 返回位置 j
 */
// TODO 实现有问题
const hoarePartition = (arr, p, r) => {
  const x = arr[p]
  let i = p - 1, j = r + 1
  while (true) {
    while (arr[--j] > x) { }
    while (arr[++i] < x) { }
    if (i < j) {
      swap(arr, i, j)
    } else {
      return j
    }
  }
}

const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const arr = [2, 8, 7, 1, 3, 5, 6, 4]
quickSort(arr)
console.log(arr)

// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
// console.log('测试算法')
// const arr = Array.from({ length: 15 }, (_, i) => (i + 1))
// arr.push(9, 12)
// const shuffle = arr => {
//   for (let i = arr.length - 1; i > 0; i--) {
//     const r = Math.floor(Math.random() * i)
//       ;[arr[i], arr[r]] = [arr[r], arr[i]]
//   }
// }
// shuffle(arr)
// console.log('洗牌', arr)

// quickSort(arr)
// console.log('快速排序', arr)

// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
// const formatMax = value => {
//   const texts = ['十', '百', '千', '万', '十万', '百万', '千万', '亿']
//   return String(value).replace(/^([1-9])(0+)$/g, (_, p1, p2) => {
//     return ([1, 5].includes(p2.length) ? '' : p1) + texts[p2.length - 1]
//   })
// }
// const max = 1000000
// const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
// shuffle(arr2)
// console.log(`性能测试 - ${formatMax(max)} 条数据`)
// console.time('hoare quick sort time')
// quickSort(arr2)
// console.timeEnd('hoare quick sort time')
