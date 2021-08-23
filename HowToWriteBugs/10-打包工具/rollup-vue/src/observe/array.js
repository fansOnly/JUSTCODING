const arrayProto = Array.prototype

export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'unshift',
  'shift',
  'sort',
  'reverse',
  'splice'
]

methodsToPatch.forEach(function(method) {
  const original = arrayProto[method]
  arrayMethods[method] = function(...args) {
    console.log('array rewrite', method)
    const result = original.apply(this, args)
    let ob = this.__ob__
    let inserted // 当前用户插入的元素, 需要判断是不是对象，需不要要添加响应式
    switch ( method ) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break;
      default:
        break;
    }
    if (inserted) ob.observeArray(inserted)
    return result
  }
})
