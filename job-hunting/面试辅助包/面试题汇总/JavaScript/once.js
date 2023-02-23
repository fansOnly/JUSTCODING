/**
 * 直执行一次的函数
 */
function once(fn) {
  let ret
  let executed = false
  return function () {
    if (executed) return ret
    ret = fn.apply(this, arguments)
    executed = true
    return ret
  }
}

var f1 = () => {
  console.log('executed.')
  return 100
}

var r = once(f1)

console.log('r(): ', r())
console.log('r(): ', r())
