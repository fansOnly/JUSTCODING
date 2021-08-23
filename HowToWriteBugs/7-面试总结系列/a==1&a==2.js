/**
 * 对象的隐式转换 toString / valueOf
 */
 const a = {
  i: 0,
  toString() {
    return ++this.i
  }
}

if (a == 1 && a == 2 && a == 3) {
  console.log('success')
}

const b = {
  i: 0,
  valueOf() {
    return ++ this.i
  }
}

if (b == 1 && b == 2 && b == 3) {
  console.log('success')
}

/**
 * 数据劫持 Object.defineProperty
 */
// let i = 0
// Object.defineProperty(window, 'd', {
//   get() {
//     return ++i
//   }
// })

// if (d == 1 && d == 2 && d == 3) {
//   console.log('success')
// }

/**
 * 数组的隐式转换
 * 数组转换为字符串默认调用 Array.prototype.join 方法
 */
 const c = [1, 2, 3]
c.join = c.shift // c.toString = c.shift

if (c == 1 && c == 2 && c == 3) {
  console.log('success')
}
