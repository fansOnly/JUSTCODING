/**
 * toString
 */
const obj1 = {
  value: 1,
  toString() {
    return this.value++
  }
}

console.log(obj1 == '1' && obj1 == '2')

/**
 * valueOf
 */
const obj2 = {
  value: 1,
  toString() {
    return this.value++
  }
}

console.log(obj2 == 1 && obj2 == 2)


/**
 * Object.defineProperty
 */
const obj3 = {}
let i = 1
Object.defineProperty(obj3, 'value', {
  get() {
    return i++
  }
})

console.log(obj3.value == 1 && obj3.value == 2)


/**
 * Proxy
 */
const obj4 = new Proxy({}, {
  i: 1,
  get() {
    return () => this.i++
  }
})
console.log(obj4 == 1 && obj4 == 2)

/**
 * 数组
 * 数组的 tostring() 默认调用数组的 join() 方法
 */
const arr = [1, 2, 3]
arr.join = arr.shift

console.log(arr == 1 && arr == 2)
