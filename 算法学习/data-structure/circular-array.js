/**
 * 环形数组
 */

export class CircularArray {
  constructor(size = 1) {
    this.size = size;
    this.arr = new Array(size)
    // 区间：左开右闭
    // 第一个元素
    this.start = 0
    // 指向最后一个元素的下一个位置
    this.end = 0
    this.count = 0
  }

  resize(newSize) {
    const newArr = new Array(newSize)
    for (let i = 0; i < this.count; i++) {
      newArr[i] = this.arr[(this.start + i) % this.size]
    }
    this.arr = newArr
    this.start = 0
    this.end = this.count
    this.size = newSize
  }

  addFirst(val) {
    if (this.isFull()) {
      this.resize(this.size * 2)
    }
    this.start = (this.start - 1 + this.size) % this.size
    this.arr[this.start] = val
    this.count++
  }
  addLast(val) {
    if (this.isFull()) {
      this.resize(this.size * 2)
    }
    this.arr[this.end] = val
    this.end = (this.end + 1) % this.size
    this.count++
  }
  removeFirst() {
    if (this.isEmpty()) return
    const _val = this.arr[this.start]
    this.arr[this.start] = null
    this.start = (this.start + 1) % this.size
    this.count--
    // 缩小数组
    if (this.count && this.count == this.size / 4) {
      this.resize(this.size / 2)
    }
    return _val
  }
  removeLast() {
    if (this.isEmpty()) return
    this.end = (this.end - 1 + this.size) % this.size
    const _val = this.arr[this.end]
    this.arr[this.end] = null
    this.count--
    // 缩小数组
    if (this.count && this.count == this.size / 4) {
      this.resize(this.size / 2)
    }
    return _val
  }
  getFirst() {
    if (this.isEmpty()) return -1
    return this.arr[this.start]
  }
  getLast() {
    if (this.isEmpty()) return -1
    return this.arr[(this.end - 1 + this.size) % this.size]
  }
  isFull() {
    return this.count == this.size
  }
  isEmpty() {
    return this.count == 0
  }
  size() {
    return this.count
  }
}


// const arr = new CircularArray(6)

// arr.addLast(1)
// console.log('addLast 1:', arr)
// arr.addLast(2)
// console.log('addLast 2:', arr)
// arr.addFirst(3)
// console.log('addFirst 3:', arr)
// arr.addFirst(4)
// console.log('addFirst 4:', arr)


// let first = arr.getFirst()
// console.log('first:', first)

// const last = arr.getLast()
// console.log('last:', last)

// arr.addFirst(5)
// console.log('addFirst 5:', arr)

// arr.removeLast()
// console.log('removeLast:', arr)

// arr.removeFirst()
// console.log('removeFirst:', arr)

// arr.removeLast()
// console.log('removeLast:', arr)

// arr.removeLast()
// console.log('removeLast:', arr)