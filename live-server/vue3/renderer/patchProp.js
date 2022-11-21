import { patchAttr } from "./modules/attrs"
import { patchClass } from "./modules/class"
import { patchDOMProp } from "./modules/props"
import { patchEvent } from "./modules/events"
import { patchStyle } from "./modules/style"
import { isOn, isModelListener, isString } from '../utils'

const nativeOnRE = /^on[a-z]/

export const patchProp = (
  el,
  key,
  prevValue,
  nextValue
) => {
  if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue)
    }
  } else if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue)
  } else if (shouldSetProps(el, key, nextValue)) {
    patchDOMProp(el, key, nextValue)
  } else {
    patchAttr(el, key, nextValue)
  }
}

function shouldSetProps(el, key, value) {
  if (key === 'from') {
    return false
  }
  if (key === 'list' && el.tagName === 'INPUT') {
    return false
  }
  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false
  }
  // native onclick with string value, must be set as attribute
  if (nativeOnRE.test(key) && isString(value)) {
    return false
  }
  return key in el
}
