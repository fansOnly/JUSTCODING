import InterceptorManager from "./InterceptorManager"
import mergeConfig from "./mergeConfig"
import dispatchRequest from './dispatchRequest'
import { buildURL } from "../utils"

function Axios(defaultConfig) {
  this.defaults = defaultConfig

  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}


Axios.prototype.request = function(config = {}) {
  console.log('发起请求', config)

  // 参数处理
  if (typeof config === 'string') {
    config = arguments[1] || {}
    config.url = arguments[0]
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

  // promise 队列
  const chains = [dispatchRequest, undefined /** 占位 */]

  // 遍历请求拦截器
  this.interceptors.request.forEach(function(interceptor) {
    // 多个请求拦截器依次推入队列的首部（倒叙）[r2, r1, r, ...]
    chains.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  // 遍历响应拦截器
  this.interceptors.response.forEach(function (interceptor) {
    // 多个响应拦截器依次推入队列的尾部（正序）[r, r1, r2, ...]
    chains.push(interceptor.fulfilled, interceptor.rejected)
  })

  promise = Promise.resolve(config)

  // console.log('chains: ', chains);
  while (chains.length) {
    // promise 已经被 resolve，必定执行 dispatchRequest 方法
    // 不停的从数组首部推出 promise 队列
    // promise = promise.then(chains[0], chains[1])
    promise = promise.then(chains.shift(), chains.shift())
  }

  // try {
  //   promise = dispatchRequest(config)
  // } catch (error) {
  //   return Promise.reject(error)
  // }

  return promise
}

Axios.prototype.getUri = function(config) {
  config = mergeConfig(this.defaults, config)
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '')
}

Axios.prototype.get = function(config) {
  console.log('发起 GET 请求', config)
}

Axios.prototype.post = function(config) {
  console.log('发起 POST 请求', config)
}

export default Axios
