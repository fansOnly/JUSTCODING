/**
 * 改变 promise 状态的3种方法
 */

// 1 resolve
const p1 = new Promise(resolve => {
  resolve('success')
})


p1.then(res => {
  console.log(res)
})

// 2 reject
const p2 = new Promise((resolve, reject) => {
  reject('error')
})

p2.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})


// 3 throw 错误
const p3 = new Promise(() => {
  throw '1111'
})

p3.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
