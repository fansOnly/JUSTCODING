import { isArray, isObject, isString } from "../../utils"


export function patchClass(el, value) {
  if (value === null) {
    el.removeAttribute('class')
  } else {
    el.className = normalizeClass(value)
  }
}


function normalizeClass(className) {
  let res = ''
  if (isString(className)) {
    res = className
  } else if (isArray(className)) {
    for (let i = 0; i < className.length; i++) {
      res += ' ' + normalizeClass(className[i])
    }
  } else if (isObject(className)) {
    for (const key in className) {
      if (className[key]) {
        res += ' ' + key
      }
    }
  }
  return res.trim()
}
