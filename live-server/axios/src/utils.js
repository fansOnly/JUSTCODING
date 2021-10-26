const toString = Object.prototype.toString


/**
 * 扩展一个对象
 */
export function extend (a, b, thisArg) {
  for (let key in b) {
    const val = b[key]
    if (thisArg && typeof val === 'function') {
      a[key] = val.bind(thisArg)
    } else {
      a[key] = val
    }
  }
  return a
}


/**
 * 合并多个对象 / 数组, 返回一个对象
 * @param {Object/Array}
 * @return {Object}
 */
export function merge(/* obj1, obj2, obj3, ... */) {
  let result = {}

  for (let i = 0; i < arguments.length; i++) {
    const source = arguments[i]
    for (let key in source) {
      if (isPlainObject(result[key]) && isPlainObject(source[key])) {
        result[key] = merge(result[key], source[key])
      } else if (isPlainObject(source[key])) {
        result[key] = merge({}, source[key])
      } else if (Array.isArray(source[key])) {
        result[key] = source[key].slice()
      } else {
        result[key] = source[key]
      }
    }
  }

  return result
}


/**
 * 判断是不是一个对象
 */
export function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false
  }
  const prototype = Object.getPrototypeOf(val)
  return prototype == null || prototype === Object.prototype
}


/**
 * 判断是不是 formData 数据
 */
export function isFormData(val) {
  return typeof FormData !== undefined && val instanceof FormData
}


/**
 * 判断 URL 地址是不是一个绝对地址
 * A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
 */
export function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

/**
 * 判断是不是一个 URLSearchParams 类型
 */
export function isURLSearchParams(val) {
  return typeof URLSearchParams !== undefined && val instanceof URLSearchParams
}


/**
 * 将参数拼接在 URL 后面
 * @param {string} url 请求地址
 * @param {Object} params 请求参数
 * @param {Function} paramsSerializer 自定义的序列化参数函数
 */
export function buildURL(url, params, paramsSerializer) {
  if (!params) return

  let serializedParams = ''
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    for (let key in params) {
      let val = params[key]
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      serializedParams += (serializedParams.length ? '&' : '') + encodeURIComponent(key) + '=' + encodeURIComponent(val)
    }
  }

  return url + (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
}


/**
 * 判断是不是一个 undefined 类型
 */
export function isUndefined(val) {
  return typeof val === 'undefined'
}


/**
 * 判断是否为日期类型
 */
export function isDate(val) {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断是否为对象
 */
export function isObject(val) {
  return val !== null && typeof val === 'object'
}
