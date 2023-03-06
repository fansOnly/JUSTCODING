class ArrayList {
  constructor() {
    this.array = []
  }

  insert(item) {
    this.array.push(item)
  }

  sort() {
    return this.array.sort((a, b) => a - b)
  }

  // 1. 冒泡排序
  // 不停的两两对比，将最大的移动到尾部
  bubbleSort() {
    const arr = this.array
    const length = arr.length
    let swapped = false
    for (let i = 0; i < length - 1; i++) {
      swapped = false
      for (let j = i + 1; j < length; j++) {
        if (arr[i] > arr[j]) {
          this.swap(i, j)
          swapped = true
        }
      }
      if (!swapped) break
    }
  }
  // 2. 选择排序
  // 不停的两两对比，将最小的移动到头部
  selectionSort() {
    const arr = this.array
    const length = arr.length
    for (let i = 0; i < length - 1; i++) {
      let min = i
      for (let j = min + 1; j < length; j++) {
        if (arr[min] > arr[j]) {
          min = j
        }
      }
      this.swap(min, i)
    }
  }
  // 3.插入排序
  // 局部有序
  insertionSort() {
    const arr = this.array
    for (let i = 1; i < arr.length; i++) {
      const current = arr[i]
      let j = i
      while (j > i - 1 && arr[j - 1] > current) {
        arr[j] = arr[j - 1]
        j--
      }
      arr[j] = current
    }
  }
  // 4.希尔排序
  // 插入排序的升级版
  shellSort() {
    const arr = this.array
    const length = arr.length
    let gap = Math.floor(length / 2)

    while (gap >= 1) {
      for (let i = gap; i < length; i++) {
        const current = arr[i]
        let j = i
        while (j > gap - 1 && arr[j - gap] > current) {
          arr[j] = arr[j - gap]
          j -= gap
        }
        arr[j] = current
      }
      gap = Math.floor(gap / 2)
    }

  }
  // 5.快速排序
  // 分而治之
  // 冒泡排序的升级版
  quickSort() {
    this.quick(0, this.array.length - 1)
  }
  quick(left, right) {
    // 结束条件
    if (left >= right) return
    // 获取枢纽
    const pivot = this.getPivot(left, right)
    // 双指针
    let i = left, j = right - 1
    const arr = this.array
    while (true) {
      while (i < j && arr[++i] < pivot) { }
      while (i < j && arr[--j] > pivot) { }
      if (i < j) {
        this.swap(i, j)
      } else {
        break
      }
    }
    // 找到 right - 1 的正确位置
    this.swap(i, right - 1)
    // 递归
    this.quick(left, i - 1)
    this.quick(i + 1, right)
  }
  getPivot(left, right) {
    const arr = this.array
    const center = Math.floor((left + right) / 2)

    if (arr[left] > arr[center]) {
      this.swap(left, center)
    }
    if (arr[center] > arr[right]) {
      this.swap(center, right)
    }
    if (arr[left] > arr[center]) {
      this.swap(left, center)
    }

    // 将枢纽放置在倒数第二位
    this.swap(center, right - 1)
    return arr[right - 1]
  }

  swap(m, n) {
    const arr = this.array
    let temp = arr[n]
    arr[n] = arr[m]
    arr[m] = temp
    temp = null
  }

  toString() {
    return this.array.join(' ')
  }
}

const arr = new ArrayList()
arr.insert(66)
arr.insert(88)
arr.insert(12)
arr.insert(87)
arr.insert(100)
arr.insert(5)
arr.insert(566)
arr.insert(23)

console.log('原始顺序')
console.log(arr.toString())

console.log('sort 排序')
console.time()
arr.sort()
console.timeEnd()
console.log(arr.toString())


console.log('冒泡排序')
console.time()
arr.bubbleSort()
console.timeEnd()
console.log(arr.toString())

console.log('选择排序')
console.time()
arr.selectionSort()
console.timeEnd()
console.log(arr.toString())


console.log('插入排序')
console.time()
arr.insertionSort()
console.timeEnd()
console.log(arr.toString())

console.log('希尔排序')
console.time()
arr.shellSort()
console.timeEnd()
console.log(arr.toString())


console.log('快速排序')
console.time()
arr.quickSort()
console.timeEnd()
console.log(arr.toString())
