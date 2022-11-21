import { isArray } from "../../utils"

let cachedNow = 0
const p = Promise.resolve()
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now())

export function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options)
}

export function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options)
}

export function patchEvent(
  el,
  key,
  prevValue,
  nextValue
) {
  const invokers = el._vei || (el._vei = {})
  let invoker = invokers[key]
  const eventName = key.slice(2).toLowerCase()
  if (nextValue && invoker) {
    // patch
    invoker.value = nextValue
  } else {
    if (nextValue) {
      // add
      invoker = (invokers[key] = createInvoker(nextValue))
      addEventListener(el, eventName, invoker)
    } else {
      // remove
      removeEventListener(el, eventName, invoker)
      invokers[key] = undefined
    }
  }
}

function createInvoker(value) {
  const invoker = e => {
    if (!e._vts) {
      e._vts = Date.now()
    } else if (e._vts <= e.attached) {
      return
    }
    if (isArray(invoker.value)) {
      invoker.value.map(fn => fn(e))
    } else {
      invoker.value(e)
    }
  }
  invoker.value = value
  invoker.attached = getNow()

  return invoker
}
