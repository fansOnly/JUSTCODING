/**
 * 默认 Promise 构造函数
 * @param {*} executor 执行函数
 */
function Promise(executor) {

  // 状态
  this.state = 'pending'
  // 成功的返回值
  this.value = null
  // 失败的返回值
  this.reason = null
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
    if (self.state === 'pending') {
      self.state = 'fulfilled'
      self.value = value
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
    if (self.state === 'pending') {
      self.state = 'rejected'
      self.reason = reason
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
  const self = this
  let promise
  return new Promise((resolve, reject) => {
    if (this.state === 'fulfilled') {
      try {
        // 回调函数的执行结果
        promise = onResolved(this.value)
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
      } catch (e) {
        // 抛出异常直接返回失败状态的 promise
        reject(e)
      }
    } else if (this.state === 'rejected') {
      promise = onRejected(this.reason)
    } else {
      // 处理异步的状态改变
      this.callbacks.push({
        onResolved: function () {
          promise = onResolved(self.value)
        },
        onRejected: function () {
          promise = onResolved(self.reason)
        }
      })
    }
  })
}











window.Promise = Promise
