class Queue {
  constructor() {
    this.items = []
  }

  enqueue(item) {
    this.items.push(item)
  }
  dequeue() {
    return this.items.shift()
  }
  front() {
    return this.items[0]
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
