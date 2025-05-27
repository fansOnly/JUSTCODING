import { CircularArray } from "./circular-array.js";

/**
 * 队列的数组实现
 */

class MyArrayQueue {
  constructor() {
    this.list = new CircularArray();
  }
  push(val) {
    this.list.addLast(val)
  }
  pop() {
    return this.list.removeFirst()
  }
  peek() {
    return this.list.getFirst()
  }
  size() {
    return this.list.size()
  }
}

const queue = new MyArrayQueue()
queue.push(1)
queue.push(2)
queue.push(3)
console.log('queue: ', queue);
console.log(queue.peek())
console.log(queue.pop())
console.log(queue.pop())
console.log(queue.peek())
console.log('queue: ', queue);