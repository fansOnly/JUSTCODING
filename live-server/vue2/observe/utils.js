export const def = function(obj, key, value, enumerable) {
  return Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}


export const parsePath = function (str) {
  const segments = str.split('.')
  return obj => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}


