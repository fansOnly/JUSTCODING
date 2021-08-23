/**
 * [1, [2, 3], [[4], [4, [4, 5]]]].unique() => [1, 2, 3, 4, 5]
 */
Array.prototype.unique = function() {
  return [...new Set(this.flat(Infinity))]
}

console.log([1, [2, 3], [[4], [4, [4, 5]]]].unique())


/**
 * 递归实现1到n的和输出
 * 1. 递归爆栈
 * 2. 通过 setTimeout 处理，数据过大时结果输出缓慢
 * 3. 通过分批处理，只使用部分延时可以较快输出结果
 */
 function sum(total, n, callback) {
  if (n === 0) {
    callback(total)
    return
  }
  if (n % 1000 === 0) {
    setTimeout(() => {
      sum(total + n, n - 1, callback)
    }, 0);
  } else {
    sum(total + n, n - 1, callback)
  }
}

// console.log(sum(0, 1000009, value => {
//   console.log(value)
// }))
