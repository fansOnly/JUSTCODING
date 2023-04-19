/**
 * 快速排序尾递归优化
 */
const tailRecursiveQuickSOrt = (arr, p = 0, r = arr.length - 1) => {
  while (p < r) {
    const q = partition(arr, p, r)
    tailRecursiveQuickSOrt(arr, p, q - 1)
    p = q + 1
  }
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
tailRecursiveQuickSOrt(arr)
console.log('尾递归快速排序', arr)


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
console.time('tail recursive quick sort time')
tailRecursiveQuickSOrt(arr2)
console.timeEnd('tail recursive quick sort time')
