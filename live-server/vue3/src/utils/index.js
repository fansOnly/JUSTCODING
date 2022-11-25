
export * from './errorHanding.js'
export * from './normalizeProp.js'

export const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val, key) => hasOwnProperty.call(val, key)

export const objectToString = Object.prototype.toString
export const toTypeString = (val) => objectToString.call(val)

export const toRawType = (val) => {
  return toTypeString(val).slice(8, -1)
}

export const isMap = val => {
  return toTypeString(val) === '[object Map]'
}
export const isSet = val => {
  return toTypeString(val) === '[object Set]'
}
export const isPlainObject = val => {
  return toTypeString(val) === '[object Object]'
}
export const isString = val => typeof val === 'string'
export const isSymbol = val => typeof val === 'symbol'
export const isObject = val => typeof val === 'object' && val !== null
export const isFunction = val => typeof val === 'function'

export const isArray = Array.isArray

export const toNumber = val => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export const isIntegerKey = key =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key

export const extend = Object.assign

export const NOOP = () => {}
export const EMPTY_OBJ = {}
export const EMPTY_ARRAY = []

const onRE = /^on[^a-z]/
// Vue 事件绑定
export const isOn = key => onRE.test(key)

export const isModelListener = key => key.startsWith('onUpdate:')

export const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  })
}

const cacheStringFunction = fn => {
  const cache = Object.create(null)
  return (str) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelizeRE = /-(\w)/g

export const camelize = cacheStringFunction(str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

const hyphenateRE = /\B([A-Z])/g

export const hyphenate = cacheStringFunction(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

export const capitalize = cacheStringFunction(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

// compare value, accounting for NaN
export const hasChanged = (value, oldValue) => !Object.is(value, oldValue)
