import { MyLinkedList } from "../leetcode-707.js";

/**
 * 栈的链式实现
 * 1. 先入后出
 */

class MyLinkedStack {
  constructor() {
    this.list = new MyLinkedList();
  }
  push(val) {
    this.list.addAtTail(val)
  }
  // 栈头删除元素
  pop() {
    return this.list.deleteTail()
  }
  // 栈顶元素
  peek() {
    return this.list.getTail()
  }
  size() {
    return this.list.size()
  }
}

const stack = new MyLinkedStack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log('stack: ', stack);
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
console.log('stack: ', stack);