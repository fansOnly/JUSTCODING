const bubbleSort = arr => {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

  return arr
}

const bubbleSort2 = arr => {
  let i = arr.length - 1
  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    i = pos
  }

  return arr
}

const bubbleSort3 = arr => {
  let left = 0, right = arr.length - 1
  while (left < right) {
    for (let j = left; j < right; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    --right
    for (let j = right; j > left; j--) {
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }
    }
    ++left
  }
  return arr
}

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.time()
console.log(bubbleSort(arr))
console.timeEnd()
console.time()
console.log(bubbleSort2(arr))
console.timeEnd()
console.time()
console.log(bubbleSort3(arr))
console.timeEnd()
