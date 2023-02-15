const quickSort = arr => {
  if (arr.length < 2) return arr
  const pivotIdx = arr.length >> 1
  const pivot = arr[pivotIdx]

  const left = [], right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot || (arr[i] === pivot && i !== pivotIdx)) {
      left.push(arr[i])
    } else if (arr[i] > pivot) {
      right.push(arr[i])
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.time()
console.log(quickSort(arr))
console.timeEnd()
