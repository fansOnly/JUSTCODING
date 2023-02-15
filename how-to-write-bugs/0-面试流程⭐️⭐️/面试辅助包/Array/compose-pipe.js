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
