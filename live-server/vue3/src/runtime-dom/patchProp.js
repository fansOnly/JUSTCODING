import { patchAttr } from "./modules/attrs.js"
import { patchClass } from "./modules/class.js"
import { patchDOMProp } from "./modules/props.js"
import { patchEvent } from "./modules/events.js"
import { patchStyle } from "./modules/style.js"
import { isOn, isModelListener, isString } from '../utils/index.js'

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
