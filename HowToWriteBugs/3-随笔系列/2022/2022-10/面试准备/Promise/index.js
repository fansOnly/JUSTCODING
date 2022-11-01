class Promise {
  constructor(execute) {
    this.state = 'pending'
    this.data = ''
    this.resolvedFns = []
    this.rejectedFns = []

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.data = value
        this.resolvedFns.forEach(cb => cb(value))
      }
    }

    const reject = (value) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.data = value
        this.rejectedFns.forEach(cb => cb(value))
      }
    }

    try {
      execute(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  /**
   * 注意链式调用，需要返回一个 promise
   * 1. 如果返回一个普通值，将这个值传给下一个 then
   * 2. onFulfilled / onReject 是异步的
   */
  then(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onReject = typeof onReject === 'function' ? onReject : (error) => { throw error }

    const promise2 = new Promise((resolve, reject) => {
      if (this.state === 'pending') {
        // pending 状态需要把回调函数收集
        this.resolvedFns.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                onFulfilled(this.data)
              } else {
                const value = onFulfilled(this.data)
                resolvePromise(promise2, value, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        this.rejectedFns.push(() => {
          setTimeout(() => {
            try {
              if (typeof onReject !== 'function') {
                onReject(this.data)
              } else {
                const value = onReject(this.data)
                resolvePromise(promise2, value, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
      } else if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const value = onFulfilled(this.data)
            resolvePromise(promise2, value, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      } else {
        setTimeout(() => {
          try {
            const value = onReject(this.data)
            resolvePromise(promise2, value, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
    })
    return promise2
  }

  catch(onReject) {
    return this.then(null, onReject)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
    return this
  }
}

/**
 * 1. x !== promise
 * 2. 普通值直接 resolve
 * 3. 对于对象或者函数，then = x.then
 * 4. 保证回调只执行一次，成功的回调继续递归调用，失败的回调直接抛出错误
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    throw new TypeError('Chaining cycle detected for promise')
  }
  if (x instanceof Promise) {
    /**
     * 2.3.2 如果 x 为 Promise ，则使 promise2 接受 x 的状态
     *       也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
     */
    x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
    }, reject);
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 2.3.3 如果 x 为对象或函数
    // 2.3.3.1 把 x.then 赋值给 then
    try {
      var then = x.then
    } catch (error) {
      reject(error)
    }
    if (typeof then === 'function') {
      let called = false
      try {
          // 2.3.3.3 如果 then 是函数，将 x 作为函数的作用域 this 调用之
          // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          then.call(x, y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          }, error => {
            if (called) return
            called = true
            reject(error)
          })
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  } else {
    return resolve(x)
  }
}

Promise.resolve = function(value) {
  return new Promise(resolve => {
    resolve(value)
  })
}

Promise.reject = function(error) {
  return new Promise((resolve, reject) => {
    reject(error)
  })
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let called = 0
    const res = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((value) => {
        called++
        res[i] = value
        if (called === promises.length) {
          resolve(res)
        }
      }, reject)
    }
  })
}

Promise.any = function(promises) {
  return new Promise((resolve, reject) => {
    let called = 0
    const res = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, error => {
        called++
        res[i] = error
        if (called === promises.length) {
          reject(res)
        }
      })
    }
  })
}

Promise.allSettled = function(promises) {
  return new Promise((resolve, reject) => {
    let called = 0
    const res = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((value) => {
        res[i] = { status: 'fulfilled', value: value }
        if (++called === promises.length) {
          resolve(res)
        }
      }, error => {
        res[i] = { status: 'rejected', reason: error }
        if (++called === promises.length) {
          resolve(res)
        }
      })
    }
  })
}

Promise.deferred = function() {
  let result = {}
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = Promise
