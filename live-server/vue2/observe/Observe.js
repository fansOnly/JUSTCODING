import { def } from './utils.js'
import defineReactive from './defineReactive.js'
import { arrayMethods } from './array.js'
import Dep from './Dep.js'

export default class Observe {
  constructor(value) {

    this.dep = new Dep()

    def(value, '__ob__', this, false)

    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  // 处理对象
  walk(value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }

  // 处理数组
  observeArray(items) {
    for (let i = 0, len = items.length; i < len; i++) {
      observe(items[i])
    }
  }
}


export function observe(value) {
  if (typeof value !== 'object') return
  var ob
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    ob = new Observe(value)
  }
  return ob
}
