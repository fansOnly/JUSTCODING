import Axios from "./core/Axios.js"
import defaults from "./defaults.js"
import mergeConfig from "./core/mergeConfig"
import { extend, bind } from './utils'

function createInstance(defaultConfig) {

  const context = new Axios(defaultConfig)

  // 指定 instance 为 Axios 原型上的 request 方法 -- 函数
  const instance = bind(Axios.prototype.request, context)

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

export default axios
