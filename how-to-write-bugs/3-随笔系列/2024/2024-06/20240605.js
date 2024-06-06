/**
 * 字节面试题
 * 如何使下面等式成立
 * var [a, b] = {a: 1, b: 2}
 */

/**
 * 思路：
 * 1. 左边是数组，右边是对象，等式不成立
 * TypeError: {(intermediate value)(intermediate value)} is not iterable
 * 2. 数组可迭代，对象不可迭代，如何使对象可迭代？
 * 3. 数组迭代的原理 - [Symbol.iterator] - {}
 * 4. 复制数组迭代的原理到对象上
 */


const arr = []
// 从 Array 上继承 Symbol.iterator
console.log(arr.__proto__)

// Object [Array Iterator] {}
console.log(arr.__proto__[Symbol.iterator]())

// 实现可迭代协议，实现 @@iterator 方法
Object.prototype[Symbol.iterator] = function() {
  // 实现迭代器协议，返回一个对象，包含 next 方法
  return Object.values(this)[Symbol.iterator]()
}


var [a, b] = {a: 1, b: 2}