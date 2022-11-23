import { reactive } from './reactive.js'

export function ref(val) {
  const wrapper = {
    value: val
  }
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })

  return reactive(wrapper)
}

export function toRef(obj, key) {
  const wrapper = {
    get value() {
      return obj[key]
    },
    set value(newVal) {
      obj[key] = newVal
    }
  }
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })

  return wrapper
}

export function toRefs(obj) {
  let res = {}
  for (const key in obj) {
    res[key] = toRef(obj, key)
  }
  return res
}

export function proxyRefs(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      return value.__v_isRef ? value.value : value
    }
  })
}

export const isRef = val => {
  return val && val.__v_isRef === true
}
