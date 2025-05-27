import { MyLinkedList } from '../leetcode-707.js'

/**
 * 队列
 * 1. 先进先出
 * 链表实现
 */

class MyLinkedQueue {
  constructor() {
    this.data = new MyLinkedList([])
  }

  push(val) {
    this.data.addAtTail(val)
  }
  // 对头删除元素
  pop() {
    return this.data.deleteHead()
  }
  // 查看队头元素
  peek() {
    return this.data.getHead()
  }
  size() {
    return this.data.size()
  }
}

const queue = new MyLinkedQueue()
queue.push(1)
queue.push(2)
queue.push(3)
console.log('queue: ', queue);
console.log(queue.peek())
console.log(queue.pop())
console.log(queue.pop())
console.log(queue.peek())
console.log('queue: ', queue);