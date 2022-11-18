/**
 * 通用首部
 * 1. Date
 * 2. Connection
 * 3. Cache-Control
 * 4. Transfer-Encoding
 *
 * 请求首部
 * 1. Host
 * 2. Accept Accept-Charset Accept-Language Accept-Encoding
 * 3. If-Match If-None-Match
 * 4. If-Modified-Since If-Unmodified-Since
 * 5. Range
 * 6. User-Agent
 *
 * 响应首部
 * 1. Server
 * 2. Location
 * 3. ETag
 * 4. Accept-Range
 *
 * 实体首部
 * 1. Allow
 * 2. Expires
 * 3. Last-Modified
 * 4. Content-Language
 * 5. Content-Encoding
 * 6. Content-Length
 * 7. Content-Type
 */


/**
 * babel: 只转译新标准引入的语法
 * 1. 箭头函数  扩展运算符 class  let/const 结构等
 *
 * polyfill: 解决新标准引入的全局变量，部分原生对象新增的原型链上的方法
 * 0. 全局变量
 * 1. Promise
 * 2. Symbol
 * 3. WeakMap / Set
 * 4. includes
 * 5. generator 函数
 */



/**
 * babel - plugin vs preset
 * 1. plugin: 正序执行
 * 2. preset: 倒序执行
 * 3. plugin 比 preset 先执行
 */



/**
 * 原生实现 ajax
 */
function ajax(url, fn) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 || xhr.status == 304) {
        fn.call(this, JSON.parse(xhr.responseText))
      }
    }
  }
  xhr.send()
}


/**
 * Promise 实现 ajax
 */
function ajax2(url) {
  const xhr = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.open('get', url, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 && xhr.status == 304) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error(xhr.responseText))
        }
      }
    }
    xhr.send()
  })
}
