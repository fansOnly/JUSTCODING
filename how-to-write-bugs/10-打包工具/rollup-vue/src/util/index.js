export function isObject(data) {
  return typeof data === 'object' && data !== null
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

export const hasProto = '__proto__' in {}
