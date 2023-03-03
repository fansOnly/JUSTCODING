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


function winnerName(arr, pos) {
  let queue = new Queue()
  for (let i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i])
  }
  while (queue.size() > 1) {
    for (let i = 0; i < pos - 1; i++) {
      queue.enqueue(queue.dequeue())
    }
    queue.dequeue()
  }
  const target = queue.front()
  return arr.indexOf(target)
}

const arr = ['John', 'Lily', 'Tom', 'Lucy', 'ZhangSan', 'LiSi', 'WangWu']

console.log(winnerName(arr, 3))
