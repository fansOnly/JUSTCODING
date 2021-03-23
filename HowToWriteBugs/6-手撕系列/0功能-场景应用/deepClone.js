/**
 * 深拷贝
 * 1. 基本类型直接拷贝
 * 2. 普通对象和数组通过递归深层拷贝
 * 3. Symbol 类型的属性单独处理
 * 4. 特殊类型处理 Function / Map / Set / Date / RegExp 类型的值
 * 5. 循环引用自身
 */
const getType = val => {
    return Object.prototype.toString.call(val).replace(/^\[object (\w+)\]/, '$1').toLowerCase()
}

const deepClone = (target, cache = new WeakMap()) => {
    if (typeof target !== 'object' && typeof target !== 'function') return target

    if (cache.has(target)) return cache.get(target)

    if (getType(target) === 'date') return new Date(target)
    if (getType(target) === 'regexp') return new RegExp(target.source, target.flags)

    if (getType(target) === 'function') {
        if (!target.prototype) return target
        return function() {
            return target.call(this, ...arguments)
        }
    }

    const cloneTarget = new target.constructor()
    // 处理循环引用
    cache.set(target, cloneTarget)

    if (getType(target) === 'map') {
        target.forEach((value, key) => {
            cloneTarget.set(deepClone(key, cache), deepClone(value, cache))
        })
    }

    if (getType(target) === 'set') {
        target.forEach(value => {
            cloneTarget.add(deepClone(value, cache))
        })
    }

    const symKeys = Object.getOwnPropertySymbols(target)
    if (symKeys.length) {
        symKeys.forEach(symKey => {
            cloneTarget[symKey] = deepClone(target[symKey], cache)
        })
    }

    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            cloneTarget[key] = deepClone(target[key], cache)
        }
    }

    return cloneTarget
}

const sym = Symbol('sym')
const map = new Map().set('m1', 'mapv1')
const set = new Set().add('setv1')
const origin = {
    [sym]: 'Sym',
    a: 'a',
    'obj': {
        'b1': 'b1',
    },
    'array': ['c1', 'c2', {a: 1}],
    'arrow': () => 'origin arrow func', // 
    'func': function() {
        return 'origin normal func.'
    }, //
    'deepobj': {
        d1: {
            d2: new Date()
        }
    },
    'regexp': new RegExp(),
    'date': new Date(),
    map,
    set,
}

origin.origin = origin
const clone = deepClone(origin)

// 验证循环引用
console.log(clone.origin === origin)  // fasle
console.log(clone.origin === origin.origin) // false

// 验证 symbol 键
// console.log(origin[sym] === clone[sym])
clone[sym] = 'ssss'
console.log(clone[sym])
console.log(origin[sym])

// 验证对象，嵌套对象
console.log(clone.obj === origin.obj)
console.log(clone.deepobj.d1 === origin.deepobj.d1)

// 验证数组，数组包含引用类型的元素
console.log(clone.array === origin.array)
console.log(clone.array[2] === origin.array[2])

// 验证正则
console.log(clone.regexp === origin.regexp)

// 验证日期对象
console.log(clone.date === origin.date)

// 验证 Set
console.log(clone.set === origin.set)
clone.set.add('sv2')
console.log(clone.set)
console.log(origin.set)

// 验证箭头函数
console.log(clone.arrow === origin.arrow)
clone.arrow = () => 'clone arrow func'
console.log(origin.arrow()) // origin arrow func

// 验证函数
console.log(clone.func === origin.func)
clone.func = function() { return 'clone normal func.' }
console.log(origin.func()) // origin normal func.

// 验证 Map
console.log(clone.map === origin.map)
clone.map.set('c', 'cv2')

console.log(clone.map)
console.log(origin.map)
