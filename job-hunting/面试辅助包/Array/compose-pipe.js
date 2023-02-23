const compose = (...fns) => {
  return fns.reduce((fn, f1) => (...args) => f1(fn(...args)))
}

const add = (a, b) => a + b
const multi = (a) => a * a
const pow = (a) => a ** 2

const fn = compose(add, multi, pow)
const res = fn(1, 2)
// 1 + 2 = 3
// 3 * 3 = 9
// 9 * 9 = 81
console.log(res) // 81



/**
 * 管道函数
 */
function compose2(list) {
  const init = list.shift()
  return function (...args) {
    return list.reduce((pre, cur) => {
      return pre.then(res => {
        // 将上一个函数执行的结果当作下一个函数的参数传入
        return cur.call(null, res)
      })
    }, Promise.resolve(init.apply(null, args)))
  }
}

const af1 = data => {
  console.log('async 1')
  return data + 1
}
const af2 = data => {
  console.log('async 2')
  return data * 2
}
const af = compose([af1, af2])
af(5).then(res => {
  console.log('af', res)
})

const ap1 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('ap1')
      resolve(data + 1)
    }, 200)
  })
}
const ap2 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('ap2')
      resolve(data * 3)
    }, 100)
  })
}
const ap = compose([ap1, ap2])
ap(3).then(res => {
  console.log('ap', res)
})
