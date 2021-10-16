import { def } from './utils.js'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = ['shift', 'unshift', 'push', 'pop', 'sort', 'reverse', 'splice']

methodsToPatch.forEach(method => {
  const original = arrayMethods[method]
  def(arrayMethods, method, function(...args) {
    const result = original.apply(this, args)
    // 当前的数组对象已经被绑定了响应式 __ob__
    let ob = this.__ob__
    let inserted
    switch (method) {
      case 'unshift':
      case 'push':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 新增的元素也需要绑定响应式
    if (inserted) ob.observeArray(inserted)
    // 通知更新
    ob.dep.notify()
    return result
  })
})
