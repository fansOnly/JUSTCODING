/**
 * 逆序对
 * A[1...n]
 * if i < j and A[i] > A[j]
 * 对偶 [i, j] 称为 A 的一个逆序对
 */
const getInversion = arr => {
  let res = []
  let j = 0
  for (let i = 0; i < arr.length; i++) {
    j = i + 1
    while (j < arr.length) {
      if (arr[i] > arr[j]) {
        res.push([i, j])
      }
      j++
    }
  }
  return res
}

const arr = [2, 5, 3, 8, 7, 6, 1]
const res = getInversion(arr)
console.log('逆序对', res.length)


const mergeInversion = (arr, p, q, r) => {
  const left = arr.slice(p, q + 1)
  const right = arr.slice(q + 1, r + 1)
  // console.log(left, right)
  let i = 0, j = 0
  let inversions = 0
  while (j < right.length) {
    if (left[i] > right[j]) {
      inversions++
      // console.log('逆序数: ', left[i], right[j])
    } else if (i === left.length) {
      i = 0
      j++
      continue
    }
    i++
  }
  return inversions
}

const countInversions = (arr, p = 0, r = arr.length) => {
  let inversions = 0
  if (p < r) {
    const mid = (p + r) >> 1
    inversions += countInversions(arr, p, mid)
    inversions += countInversions(arr, mid + 1, r)
    inversions += mergeInversion(arr, p, mid, r)
  }
  return inversions
}


const count = countInversions(arr)
console.log('逆序对数', count)


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * i)
      ;[arr[i], arr[r]] = [arr[r], arr[i]]
  }
}
const max = 10000
const arr2 = Array.from({ length: max }, (_, i) => (i + 1))
shuffle(arr2)
console.log(`性能测试 - ${max} 条数据`)
console.time('normal time')
const res2 = getInversion(arr2)
console.timeEnd('normal time')
console.log('逆序对数 normal', res2.length)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.time('merge time')
const count2 = countInversions(arr2)
console.timeEnd('merge time')
console.log('逆序对数 merge', count2)
