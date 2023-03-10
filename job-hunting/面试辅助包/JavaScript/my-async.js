function myAsync(gen) {
  // 不能使用箭头函数
  return function () {
    return new Promise((resolve, reject) => {
      const g = gen()
      const next = context => {
        let res
        try {
          res = g.next(context)
        } catch (error) {
          reject(error)
        }
        const { value, done } = res
        if (done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(res => next(res), err => next(err))
        }
      }
      next()
    })
  }
}



const getFetch = (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num + 1)
    }, 1000)
  })
}
function* gen() {
  let res1 = yield getFetch(1)
  let res2 = yield getFetch(res1)
  let res3 = yield getFetch(res2)
  return res3
}

const fn = myAsync(gen)
console.log(fn())
fn().then(res => {
  console.log(res)
})
