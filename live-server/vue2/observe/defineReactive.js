import { observe } from "./observe.js";
import Dep from './Dep.js'

export default function defineReactive(data, key, val) {

  const dep = new Dep()

  if (arguments.length === 2) {
    val = data[key]
  }
  // 递归子属性
  let childOb = observe(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // console.log('获取属性' + key + '值：', val)
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newVal) {
      // console.log('设置属性' + key + '值：', val , '=>', newVal)
      if (val === newVal) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      // 通知更新
      dep.notify()
    }
  })
}
