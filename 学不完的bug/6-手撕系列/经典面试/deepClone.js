/**
 * 深拷贝
 * 1. 基本类型直接拷贝
 * 2. 普通对象和数组通过递归深层拷贝
 * 3. Symbol 类型的属性单独处理
 * 4. 特殊类型处理 Map / Set / Date / RegExp
 */
const getType = val => {
    return Object.prototype.toString.call(val).replace(/^\[object (\w+)\]/, '$1').toLowerCase()
}

const deepClone = (target, cache = new WeakMap()) => {
    if (typeof target !== 'object' && target !== null) return target
    if (cache.has(target)) return cache.get(target)
    const cloneTarget = Array.isArray(target) ? [] : getType(target) === 'object' ? {} : target
    cache.set(target, cloneTarget)

    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            cloneTarget[key] = getType(target[key]) === 'object' ? deepClone(target[key], cache) : target[key]
        }
    }

    return cloneTarget
}

const s1 = new RegExp()
console.log(deepClone(s1))

const obj = {
    a: 'a',
    b: {
        'b1': 'b1',
    },
    c: ['c1', 'c2'],
    f: Symbol('f'),
    g: () => 'g',
    d: {
        d1: {
            d2: new Date()
        }
    },
    e: new RegExp(),
    h: new Set().add('h'),
    i: new Map().set('i', 'i')
}
console.log(obj)

const obj2 = deepClone(obj)
obj2.b.b1 = 'b11111'
obj2.c.push('c333', 'c4444')
obj2.g = () => 'g22222'
obj2.h.add('h222')
obj2.i.set('i', 'i2222')
console.log(obj2)
