import { CircularArray } from './circular-array.js';

/**
 * 双端队列的数组实现
 * 双端队列是一种特殊的队列，它允许在两端进行插入和删除操作。
 * 双端队列的实现可以用链表来实现。
 * 双端队列的操作包括：
 * 1. 入队：将元素添加到双端队列的尾部。
 * 2. 出队：将元素从双端队列的头部移除。
 * 3. 取队首：返回双端队列的头部元素。
 * 4. 取队尾：返回双端队列的尾部元素。
 * 5. 判空：判断双端队列是否为空。
 * 6. 判满：判断双端队列是否已满。
 * 7. 长度：返回双端队列的长度。
 */

class MyArrayDeque {
  constructor() {
    this.list = new CircularArray();
  }
  addFirst(val) {
    this.list.addFirst(val)
  }
  addLast(val) {
    this.list.addLast(val)
  }
  removeFirst() {
    return this.list.removeFirst()
  }
  removeLast() {
    return this.list.removeLast()
  }
  peekFirst() {
    return this.list.getFirst()
  }
  peekLast() {
    return this.list.getLast()
  }
}

// 使用示例
const myDeque = new MyArrayDeque();

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