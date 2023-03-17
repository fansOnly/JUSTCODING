/**
 * 海康威视笔试题
 * 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
 * 题目要求红灯亮过后，绿灯才能亮，绿灯亮过后，黄灯才能亮，黄灯亮过后，红灯才能亮
 */

const red = () => console.log('red')
const green = () => console.log('green')
const yellow = () => console.log('yellow')

// 方法一 promise
// const lighting = (fn, delay) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       fn()
//       resolve()
//     }, delay)
//   })
// }

// const start = () => {
//   Promise.resolve().then(() => {
//     return lighting(red, 3000)
//   }).then(() => {
//     return lighting(green, 1000)
//   }).then(() => {
//     return lighting(yellow, 2000)
//   }).then(() => {
//     start()
//   })
// }

// start()

// 方法二 async/await
const sleep = async (delay) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const start2 = async () => {
  await sleep(3000)
  red()
  await sleep(1000)
  green()
  await sleep(2000)
  yellow()
  start2()
}

start2()
