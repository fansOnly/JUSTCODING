import Axios from "./core/Axios"
import defaults from "./defaults"
import mergeConfig from "./core/mergeConfig"
import { extend } from './utils'
import CancelToken from "./cancel/CancelToken"

function createInstance(defaultConfig) {

  // 创建一个 Axios 的实例
  const context = new Axios(defaultConfig)

  // 指定 instance 为 Axios 原型上的 request 方法 -- 函数
  const instance = Axios.prototype.request.bind(context)

  // 复制 Axios 原型上的全部方法
  extend(instance, Axios.prototype, context)

  // 复制 context 实例对象的全部方法
  extend(instance, context)

  instance.create = function(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig))
  }

  return instance
}

const axios = createInstance(defaults)

axios.Axios = Axios

axios.CancelToken = CancelToken

window.axios = axios

export default axios
