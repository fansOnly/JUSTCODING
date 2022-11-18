import { isObject, def, hasProto } from '../util/index'
import { arrayMethods } from './array'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

class Observer {
  constructor(value) {
    // 为每一个监测过的属性添加响应式标记
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
}

// Object.defineProprty() es5，无法兼容 ie8
export function observe(data) {
  if (!isObject(data)) return
  let ob
  ob = new Observer(data)
  return ob
}

function defineReactive(data, key, value) {
  // 递归数据响应式
  if (isObject(value)) observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('getter::', key, value)
      return value
    },
    set(newValue) {
      console.log('setter::', key, value, newValue)
      if (value === newValue) return
      observe(newValue) // 如果用户手动赋值引用类型，需对其添加响应式
      value = newValue
    }
  })
}

// 支持原型属性 __proto__
function protoAugment(target, src) {
  target.__proto__ = src
}

// 不支持原型属性，拷贝添加
function copyAugment(target, src, keys ) {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
