// 基于数组实现
class Stack {
  constructor() {
    this.items = []
  }

  push(item) {
    this.items.push(item)
  }
  pop() {
    return this.items.pop()
  }
  peek() {
    return this.items[this.items.length - 1]
  }
  isEmpty() {
    return this.items.length === 0
  }
  size() {
    return this.items.length
  }
  toString() {
    let res = ''
    for (let i = 0; i < this.items.length; i++) {
      res += `${this.items[i]} `
    }
    return res
  }
}
