import { isFormData, buildURL, isUndefined } from '../utils'
import buildFullPath from '../core/buildFullPath'
import Cancel from '../cancel/Cancel'

export default function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    // 请求前置处理
    const requestData = config.data || null
    const requestHeaders = config.headers
    const responseType = config.responseType

    if (isFormData(requestData)) {
      // 对于 FormData 格式的数据，让浏览器自动设置请求内容类型
      delete requestHeaders['Content-Type']
    }

    // 创建请求对象
    let request = new XMLHttpRequest()

    // 请求路径
    const fullPath = buildFullPath(config.baseURL, config.url)

    // 发起请求
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true)

    request.onreadystatechange = function() {
      // 使用 promise / setTimeout 模拟
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          // 响应成功
          const response = {
            data: config.params,
            status: request.status,
            statusText: request.statusText,
            headers: requestHeaders,
            config,
            request
          }

          if (response.status) {
            resolve(response)
          } else {
            reject('响应失败' + response.status)
          }
        }
      }
    }

    // 处理请求被终止
    request.onabort = function() {
      reject('Request aborted' + request)
      request = null
    }

    // 处理请求错误
    request.onerror = function() {
      reject('Network Error' + request)
      request = null
    }

    // 处理请求超时
    request.ontimeout = function() {
      const timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded'
      reject(timeoutErrorMessage)
      request = null
    }

    // 设置响应类型
    if (responseType && responseType !== 'json') {
      config.requestType = responseType
    }

    // 设置跨域 cookie 携带
    if (!isUndefined(config.withCredentials)) {
      config.withCredentials = !! config.withCredentials
    }

    // 取消请求的逻辑处理
    if (config.cancelToken) {
      config.cancelToken.promise.then(() => {
        reject(new Cancel('请求被取消了.'))
        request.abort()
        request = null
      })
    }

    request.send(requestData)
  })
}
