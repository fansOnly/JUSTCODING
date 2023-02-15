const insertionSort = arr => {
  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = cur
  }
  return arr
}

const binaryInsertionSort = arr => {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let left = 0, right = i - 1
    while (left <= right) {
      const mid = left + right >> 1
      if (key < arr[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j]
    }
    arr[left] = key
  }
  return arr
}

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.time()
console.log(insertionSort(arr))
console.timeEnd()
console.time()
console.log(binaryInsertionSort(arr))
console.timeEnd()
