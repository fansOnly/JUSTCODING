/**
 * 一个 promise 指定多个成功/失败回调，怎么执行
 */
const p1 = new Promise((resolve) => {
  resolve()
})

p1.then(res => {
  console.log(1)
})

p1.then(res => {
  console.log(2)
})
