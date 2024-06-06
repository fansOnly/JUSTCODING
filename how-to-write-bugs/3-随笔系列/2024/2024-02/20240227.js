const bubbleSort = (arr = []) => {
  let swapped = false
  for (let i = 0; i < arr.length; i++) {
    swapped = false
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swapped = true
      }
    }
    if (!swapped) return arr
  }
  return arr
}

const quickSort = (arr = []) => {
  if (arr.length < 2) return arr
  let left = [], right = []
  const pivotIdx = arr.length >> 1
  const pivot = arr[pivotIdx]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > pivot || (arr[i] === pivot && i !== pivotIdx)) {
      right.push(arr[i])
    } else if (arr[i] < pivot) {
      left.push(arr[i])
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}

const insertionSort = (arr = []) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }
  return arr
}

const selectionSort = (arr = []) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr
}


const arr = [1,4,6,8,0,15,97,9,10,8]

console.log(bubbleSort(arr))
// console.log(quickSort(arr))
// console.log(insertionSort(arr))
// console.log(selectionSort(arr))