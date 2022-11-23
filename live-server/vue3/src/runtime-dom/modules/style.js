import { camelize, capitalize, hyphenate, isArray, isString } from "../../utils/index.js"

export function patchStyle(el, prevValue, nextValue) {
  const style = el.style
  const isCssString = isString(nextValue)
  if (nextValue && !isCssString) {
    for (const key in nextValue) {
      setStyle(style, key, nextValue[key])
    }
    if (prevValue && !isString(prevValue)) {
      for (const key in prevValue) {
        if (nextValue[key] === null) {
          setStyle(style, key, '')
        }
      }
    }
  } else {
    if (isCssString) {
      if (prevValue !== nextValue) {
        style.cssText = nextValue
      }
    } else if (prevValue) {
      el.removeAttribute('style')
    }
  }
}

const importantRE = /\s*!important$/

function setStyle(style, name, value) {
  if (isArray(value)) {
    value.forEach(v => setStyle(style, name, v))
  } else {
    const prefixed = autoPrefix(style, name)
    if (value === null) value = ''
    if (importantRE.test(value)) {
      style.setProperty(prefixed, value.replace(importantRE, ''), 'important')
    } else {
      style[prefixed] = value
    }
  }
}

const prefixes = ['Webkit', 'Moz', 'ms']
const prefixCache = {}

function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName]
  if (cached) return cached
  let name = camelize(rawName)
  if (name !== 'filter' && name in style) {
    return (prefixCache[rawName] = name)
  }
  name = capitalize(name)
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name
    if (prefixed in style) {
      return (prefixCache[rawName] = prefixed)
    }
  }
  return rawName
}
