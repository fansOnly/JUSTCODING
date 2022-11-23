import { isArray, isObject, isString } from "./index.js"

export function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {}
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item)
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key]
        }
      }
    }
    return res
  } else if (isString(value)) {
    return value
  } else if (isObject(value)) {
    return value
  }
}

// e.g. color: '#f00';
const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:(.+)/

export function parseStringStyle(cssText) {
  const ret = {}
  cssText.split(listDelimiterRE).forEach(item => {
    console.log('item: ', item);
    if (item) {
      const arr = item.split(propertyDelimiterRE)
      if (arr.length > 1) {
        ret[arr[0].trim()] = arr[1].trim()
      }
    }
  })
  return ret
}

export function normalizeClass(value) {
  let res = ''
  if (isString(value)) {
    res = value
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      res += ' ' + normalizeClass(value[i])
    }
  } else if (isObject(value)) {
    for (const key in value) {
      if (value[key]) {
        res += ' ' + key
      }
    }
  }
  return res.trim()
}
