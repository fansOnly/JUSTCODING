import { normalizeClass } from "../../utils/index.js"

export function patchClass(el, value) {
  if (value === null) {
    el.removeAttribute('class')
  } else {
    el.className = normalizeClass(value)
  }
}
