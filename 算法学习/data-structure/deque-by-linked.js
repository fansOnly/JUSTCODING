import { MyLinkedList } from '../leetcode-707.js'

/**
 * 双端队列（deque）
 * 双端队列是一种特殊的队列，它允许在两端进行插入和删除操作。
 * 双端队列的实现可以用链表来实现。
 * 双端队列的操作包括：
 * 1. 入队：将元素添加到双端队列的尾部。
 * 2. 出队：将元素从双端队列的头部移除。
 * 3. 取队首：返回双端队列的头部元素。
 * 4. 取队尾：返回双端队列的尾部元素。
 */

class MyListDeque {
  constructor() {
    this.list = new MyLinkedList()
  }
  addFirst(val) {
    this.list.addAtHead(val)
  }
  addLast(val) {
    this.list.addAtTail(val)
  }
  removeFirst() {
    return this.list.deleteHead()
  }
  removeLast() {
    return this.list.deleteTail()
  }
  peekFirst() {
    return this.list.getHead()
  }
  peekLast() {
    return this.list.getTail()
  }
}


// 使用示例
const myDeque = new MyListDeque();

myDeque.addFirst(1);
myDeque.addFirst(2);
myDeque.addLast(3);
myDeque.addLast(4);
console.log('myDeque: ', myDeque);

console.log(myDeque.removeFirst()); // 2
console.log(myDeque.removeLast()); // 4
console.log(myDeque.peekFirst()); // 1
console.log(myDeque.peekLast()); // 3
console.log('myDeque: ', myDeque);