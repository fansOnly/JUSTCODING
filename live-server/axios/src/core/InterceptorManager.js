function InterceptorManager () {
  this.handlers = []
}

/**
 * 拦截器函数入栈
 * @param {*} fulfilled
 * @param {*} rejected
 */
InterceptorManager.prototype.use = function(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  })
  // 返回拦截器编号 id
  return this.handlers.length - 1
}

/**
 * 移除拦截器函数
 * @param {*} id
 */
InterceptorManager.prototype.eject = function(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null
  }
}

/**
 * 遍历拦截器函数数组
 */
InterceptorManager.prototype.forEach = function(fn) {
  for (let i = 0; i < this.handlers.length; i++) {
    if (this.handlers[i] !== null) {
      fn(this.handlers[i])
    }
  }
}

export default InterceptorManager
