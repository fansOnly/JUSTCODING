/**
 * 改变 promise 状态和指定回调函数执行顺序
 */

// 1. 都有可能，正常是先改变状态，在执行回调
const p1 = new Promise((resolve) => {
  // 同步
  resolve('success')
})


p1.then(res => {
  console.log(res)
})


// 2. 如果改变状态是异步执行，则
const p2 = new Promise((resolve) => {
  // 异步，等待计时器结束，先执行回调，在改变状态
  setTimeout(() => {
    console.log('success: ');
    resolve('success')
  }, 1000);
})

p2.then(res => {
  console.log(res)
})
