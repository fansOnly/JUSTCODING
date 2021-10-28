/**
 * 默认 Promise 构造函数
 * @param {*} executor 执行函数
 */
function Promise(executor) {

  // 状态
  this.PromiseState = 'pending'
  // 成功 / 失败 的返回值
  this.PromiseResult = null
  // 存储回调函数
  this.callbacks = []
  // 注意调用时的 this 指向，默认 window
  const self = this

  /**
   * 成功回调
   * 1. 修改状态
   * 2. 返回值
   */
  function resolve(value) {
    // 确保状态只改变一次
    if (self.PromiseState === 'pending') {
      self.PromiseState = 'fulfilled'
      self.PromiseResult = value
      self.callbacks.forEach(item => {
        item.onResolved(value)
      })
    }
  }

  /**
   * 失败回调
   * 1. 修改状态
   * 2. 返回值
   */
  function reject(reason) {
    // 确保状态只改变一次
    if (self.PromiseState === 'pending') {
      self.PromiseState = 'rejected'
      self.PromiseResult = reason
      self.callbacks.forEach(item => {
        item.onRejected(reason)
      })
    }
  }

  try {
    // 捕获通过 throw 抛出的异常
    executor(resolve, reject)
  } catch (e) {
    // 修改 promise 的状态为失败
    reject(e)
  }
}

/**
 * then 方法
 * @param {*} onResolved 响应成功的回调
 * @param {*} onRejected 响应失败的回调
 */
Promise.prototype.then = function (onResolved, onRejected) {
  // 如果没有传入回调，默认输出
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
  // then 方法默认返回一个 promise
  return new Promise((resolve, reject) => {
    if (this.PromiseState === 'fulfilled') {
      resolvePromise(onResolved, this.PromiseResult, resolve, reject)
    } else if (this.PromiseState === 'rejected') {
      resolvePromise(onRejected, this.PromiseResult, resolve, reject)
    } else {
      // 处理异步的状态改变
      this.callbacks.push({
        onResolved: () => {
          resolvePromise(onResolved, this.PromiseResult, resolve, reject)
        },
        onRejected: () => {
          resolvePromise(onRejected, this.PromiseResult, resolve, reject)
        }
      })
    }
  })
}


/**
 * 处理 promise 返回的结果
 * 1. 非 promise 值直接返回
 * 2. promise 值返回相应的 promise 结果
 */
function resolvePromise(cb, value, resolve, reject) {
  setTimeout(() => {
    try {
      // 回调函数的执行结果
      // if (cb !== undefined) {
        const promise = cb(value)
        if (promise instanceof Promise) {
          // promise 值需要执行 then 方法后返回
          promise.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          // 非 promise 值直接返回
          resolve(promise)
        }
      // } else {
      //   resolve(cb)
      // }
    } catch (e) {
      // 抛出异常直接返回失败状态的 promise
      reject(e)
    }
  }, 0);
}


/**
 * Promise.prototype.catch
 */
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}


/**
 * Promise.resolve
 */
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(v => {
        resolve(v)
      }, r => {
        reject(r)
      })
    } else {
      resolve(value)
    }
  })
}


/**
 * Promise.reject
 */
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}


/**
 * promise.all
 */
Promise.all = function(promises) {
  const len = promises.length
  let count = 0
  let result = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      const promise = promises[i]
      promise.then(value => {
        // 不能用 push 推入，注意（异步） promise 状态改变的顺序
        result[i] = value
        if (++count === len) {
          // 全部成功才返回成功状态
          resolve(result)
        }
      }, reason => {
        // 返回失败
        reject(reason)
      })
    }
  })
}


/**
 * promise.race
 */
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        // 返回成功
        resolve(value)
      }, reason => {
        // 返回失败
        reject(reason)
      })
    }
  })
}



window.Promise = Promise
