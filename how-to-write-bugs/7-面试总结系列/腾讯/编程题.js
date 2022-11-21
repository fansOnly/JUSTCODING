/**
 * JSON 实现的深拷贝
 * 缺点：
 * 1. 不能拷贝函数
 * 2. 会将 Map Set 类型转换为空对象
 */
const deepClone = target => JSON.parse(JSON.stringify(target))
const obj = {
  a: 'a',
  b: {
    b1: 'b1'
  },
  c: [1, 2, 3],
  d: new Map().set('d', 'd'),
  e: new Set().add('e'),
  f: function () {}
}
console.log(deepClone(obj)) // { a: 'a', b: { b1: 'b1' }, c: [ 1, 2, 3 ], d: {}, e: {} }  f 被忽略


/**
 * 青蛙跳台阶 - 斐波那契
 * 跳 n 个台阶，第一次如果跳1阶，则剩下的台阶需要 n - 1 次 -> f(n - 1)
 * 如果第一次跳2阶, 则剩下的台阶需要 n - 2 次 -> f(n - 2)
 * f(n) = f(n - 1) + f (n - 2)
 */



/**
 * 函数编译 + 传参
 */
function test(a, b) {
  console.log(b)
  return {
    test: function (c) {
      return test(c, a)
    }
  }
}

var retA = test(0) // undefined
retA.test(2) // 0
retA.test(4) // 0
retA.test(8) // 0

var retB = test(0).test(2).test(4).test(8) // undefined 0 2 4

var retC = test('good').test('bad') // undefined good
retC.test('good') // bad - 闭包
retC.test('bad') // bad - 闭包
