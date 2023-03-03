class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(item, priority) {
    const ele = { val: item, priority }
    if (this.items.length === 0) {
      this.items.push(ele)
    } else {
      let added = false
      for (let i = 0; i < this.items.length; i++) {
        if (priority < this.items[i].priority) {
          this.items.splice(i, 0, ele)
          added = true
          break
        }
      }
      if (!added) {
        this.items.push(ele)
      }
    }
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
      res += `${this.items[i].val}-${this.items[i].priority} `
    }
    return res
  }
}

const pq = new PriorityQueue()
pq.enqueue('a', 10)
pq.enqueue('b', 100)
pq.enqueue('c', 10000)
pq.enqueue('d', 1000)
console.log(pq)
