// 栈
// 先进后出

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
        return !this.items.length
    }
    size() {
        return this.items.length
    }
    clear() {
        this.items = []
    }
}

const stack = new Stack()

console.log(stack.isEmpty()) // true

stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack) // { items: [1, 2, 3] }

console.log(stack.peek()) // 3

console.log(stack.size) // 3

console.log(stack.pop()) // 3

stack.clear()

console.log(stack.isEmpty()) // true
