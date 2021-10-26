import Cancel from "./cancel"

/**
 * 取消请求的逻辑
 * @param {*} executor
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.')
  }

  let resolvePromise
  this.promise = new Promise((resolve, reject) => {
    // 将 resolve 赋值给变量 resolvePromise，方便后期调用
    resolvePromise = resolve
  })

  const token = this

  executor(function cancel(message) {
    // 如果已经存在 token
    if (token.reason) {
      return
    }
    token.reason = new Cancel(message)
    // 将 this.promise 变成 fulfilled，可以执行 then 逻辑
    resolvePromise(token.reason)
  })
}


export default CancelToken
