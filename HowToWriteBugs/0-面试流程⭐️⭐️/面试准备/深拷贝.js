
/**
 * 深拷贝
 */
 function deepCopy(target, cache = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target
  }

  const constructor = target.constructor
  if (/(Function|Date|Regexp|Map|Set)/i.test(constructor.name)) {
    return new constructor(target)
  }

  if (cache.has(target)) {
    return cache.get(target)
  }
  const clone = Array.isArray(target) ? [] : {}
  cache.set(target, clone)

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = deepCopy(target[key], cache)
    }
  }
  return clone
}

var obj3 = {
  a: '1',
  b: {
    name: 'aa',
    values: [1, 8,4],
    k: obj3
  },
}

const obj3_copy = deepCopy(obj3)
console.log('obj3_copy: ', obj3_copy);


