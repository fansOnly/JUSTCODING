/**
 * 只至行一次的函数
 */
function once(fn) {
  let ret, executed = true
  return function() {
    if (!executed) return ret
    ret = fn.apply(this, arguments)
    executed = false
    return ret
  }
}

var f1 = () => {
  console.log('executed.')
  return 100
}

var r =  once(f1)

console.log('r(): ', r());
console.log('r(): ', r());



/**
 * 千位分割
 */
function numFormat(integer, sign = ',') {
  return (integer+'').replace(/(?!^)(?=(\d{3})+$)/g, sign)
}

console.log(numFormat(1234567890))



/**
 * 洗牌函数
 */
function shuffle(arr) {
  const res = [...arr]
  for (let i = res.length; i > 0; i--) {
    const index = Math.floor(Math.random() * i);
    [res[index], res[i - 1]] = [res[i-1], res[index]]
  }
  return res
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7]))
console.log(shuffle([1, 2, 3, 4, 5, 6, 7]))
console.log(shuffle([1, 2, 3, 4, 5, 6, 7]))



/**
 *
 */
 function* getResult(params) {
  yield new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(1);
          console.log(1);
      }, 1000);
  })
  yield new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(2);
          console.log(2);
      }, 500);
  })
  yield new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(3);
          console.log(3);
      }, 100);
  })
}

const gen = getResult()
// console.log('gen: ', gen.next());
for await (item of gen) {
  // console.log('item: ', item);
}



/**
 * 并发请求控制
 */
async function asyncPool(limit, arr, iteratorFn) {
  const ret = [] // 所有任务
  const executing = [] // 同步任务
  for (const item of arr) {
    // 保存异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, arr))
    ret.push(p)

    // 任务数量超出限制时
    if (arr.length > limit) {
      // 任务完成，从执行列表删除
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      // 保存正在执行的任务
      executing.push(e)
      // 正在执行的任务超出限制时，等待较快的任务完成
      if (executing.length > limit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

const timeout = delay => new Promise(resolve => setTimeout(() => {
  resolve(delay)
  console.log('delay: ', delay);
}, delay))

asyncPool(2, [2000, 1000, 3000, 2500], timeout)
