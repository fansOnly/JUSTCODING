import { effect, track, trigger } from './effect'

export function computed(getter) {
  let value
  // 是否需要重新计算
  let dirty = true

  const effectFn = effect(getter, {
    lazy: true, // 懒计算
    scheduler() {
      // 执行完副作用函数，将 dirty 重置为 true
      dirty = true
      // 手动触发响应
      trigger(obj, 'value')
    }
  })

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      // 手动添加追踪
      track(obj, 'value')
      return value
    }
  }

  return obj
}
