/**
 * 栈的数组实现
 */

class MyArrayStack {
  constructor() {
    this.list = new Array()
  }

  push(val) {
    this.list.push(val)
  }
  pop() {
    return this.list.pop()
  }
  peek() {
    return this.list[this.list.length - 1]
  }
  size() {
    return this.list.length
  }
}

const stack = new MyArrayStack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log('stack: ', stack);
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
console.log('stack: ', stack);