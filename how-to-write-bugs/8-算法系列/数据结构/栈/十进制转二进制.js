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

function dec2bin(val) {
  const stack = new Stack()
  while (val > 0) {
    stack.push(val % 2)
    val = ~~(val / 2)
  }

  let res = ''
  while (!stack.isEmpty()) {
    res += stack.pop()
  }
  return res
}

console.log(dec2bin(100))
console.log(dec2bin(10))
