
export * from './errorHanding'

export const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (obj, val) => hasOwn.call(obj, val)

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
