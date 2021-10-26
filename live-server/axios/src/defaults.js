import httpAdapter from './adapters/http'
import xhrAdapter from './adapters/xhr'
import { merge } from './utils'

// 默认请求头信息
const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

function getDefaultAdapter() {
  let adapter
  if (typeof XMLHttpRequest !== 'undefined') {
    adapter = xhrAdapter
  } else {
    adapter = httpAdapter
  }
  return adapter
}

const defaults = {
  // 请求适配器
  adapter: getDefaultAdapter(),
  // 请求参数预处理
  transformRequest: [],
  // 响应结束处理
  transformResponse: [],
  // 请求超时时间
  timeout: 0,
  // 请求头信息
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
}

const simpleMethods = ['delete', 'get', 'head']
const complicatedMethods = ['post', 'put', 'patch']

simpleMethods.forEach(method => {
  defaults.headers[method] = {}
})

complicatedMethods.forEach(method => {
  defaults.headers[method] = merge(DEFAULT_CONTENT_TYPE)
})

export default defaults
