import InterceptorManager from "./InterceptorManager"
import mergeConfig from "./mergeConfig"
import dispatchRequest from './dispatchRequest'

function Axios(defaultConfig) {
  this.defaults = defaultConfig

  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}


Axios.prototype.request = function(config) {
  console.log('发起请求', config)

  // 参数处理
  if (typeof config === 'string') {
    config = arguments[1] || {}
    config.method = arguments[0]
  } else {
    config = config || {}
  }

  config = mergeConfig(this.defaults, config)

  // 默认请求方法
  if (config.method) {
    config.method = config.method.toLowerCase()
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase()
  } else {
    config.method = 'get'
  }

  // 定义一个 promise 对象接受请求
  let promise

  const chain = [dispatchRequest, undefined]

  promise = Promise.resolve()

  while (chain.length) {
    // promise 已经被 resolve，必定执行 dispatchRequest 方法
    promise = promise.then(chain.shift(), chain.shift())
  }
}

Axios.prototype.get = function(config) {
  console.log('发起 GET 请求', config)
}

Axios.prototype.post = function(config) {
  console.log('发起 POST 请求', config)
}


export default Axios
