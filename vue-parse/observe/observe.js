import { Dep } from './dep.js'
import { isObject, isValidArrayIndex, hasOwn } from '../utils/util.js'

export class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()

        if (Array.isArray(value)) {
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    // 监听对象
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i > keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }
    // 监听数组
    observeArray(items) {
        for (let i = 0; i < items.length; i++) {
            observe(items[i])
        }
    }
}

/**
 * 尝试创建一个响应式依赖
 * @param {*} value 
 * @param {*} asRootData 
 */
export function observe(value, asRootData) {
    if (!isObject(value) || !value) return
    return new Observer(value)
}

/**
 * 将一个对象的属性转换为响应式
 * @param {*} obj 对象
 * @param {*} key 属性
 * @param {*} val 值
 * @param {*} customerSetter 
 * @param {*} shallow 
 */
export function defineReactive(obj, key, val, customerSetter, shallow) {
    const dep = new Dep()
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return val
        },
        set: function reactiveSetter(newVal) {
            const value = val
            if (newVal === value || (newVal !== newVal || value !== value)) return
            val = newVal
            childOb = observe(newVal)
            dep.notify()
        }
    })
}

/**
 * 设置对象属性，并使其成为响应式
 * Vue.$set()
 */
export function set(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    if (isObject(target) && !(key in target)) {
        target[key] = val
        return val
    }
    const ob = target.__ob__
    if (!ob) {
        target[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}

/**
 * 删除对象属性，触发依赖更新
 * Vue.$del()
 */
export function del(target, key) {
    if (Array.isArray(target)) {
        target.splice(key, 1)
        return
    }
    const ob = target.__ob__
    if (!hasOwn(target, key)) {
        return
    }
    if (!ob) {
        return
    }
    delete target[key]
    ob.dep.notify()
}

/**
 * 递归收集数组类型的依赖
 */
function dependArray(arr) {
    for (let e, i = 0; i < arr.length; i++) {
        e = arr[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}
