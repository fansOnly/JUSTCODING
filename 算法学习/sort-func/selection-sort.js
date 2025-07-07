/**
 * 选择排序
 * @param {number[]} nums
 * @return {number[]}
 */

function selectionSort(arr) {
  const len = arr.length
  let sortIndex = 0
  while (sortIndex < len) {
    let minIndex = sortIndex
    for (let i = minIndex + 1; i < len; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i
      }
    }
    [arr[sortIndex], arr[minIndex]] = [arr[minIndex], arr[sortIndex]]
    sortIndex++
  }
  return arr
}

console.log(selectionSort([3, 44, 38, 5, 47, 2,15, 36, 26, 27, 2, 46, 4, 19, 50, 48]))