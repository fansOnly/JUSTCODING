import { ITERATE_KEY, track, trigger } from './effect'
import { isObject, isArray, isSymbol, isIntegerKey, hasOwn, extend } from '../utils'
import { reactiveFlags, trackOpTypes, triggerOpTypes } from './constants'
import { isRef } from '../ref'
import { readonly, reactive, toRaw, isReadonly } from '../reactivity'
import { pauseTracking, enableTracking } from '../effect'

/**
 * get
 */
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    if (key === reactiveFlags.RAW) {
      return target
    }
    if (!isReadonly && isArray(target) && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, target)
    }
    const res = Reflect.get(target, key, receiver)
    if (!isReadonly && !isSymbol(key)) {
      track(target, key, trackOpTypes.GET)
    }
    if (shallow) {
      return res
    }
    if (isRef(res)) {
      // 自动脱 ref
      return isArray(res) && isIntegerKey(key) ? res : res.value
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res
  }
}

const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

/**
 * set
 */
function createSetter(shallow = false) {
  return function set(target, key, newVal, receiver) {
    let oldVal = target[key]
    if (isReadonly(oldVal) && isRef(oldVal) && !isRef(newVal)) {
      return false
    }
    if (!shallow) {
      // TODO
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key)
    const res = Reflect.set(target, key, newVal, receiver)
    if (target === toRaw(receiver)) {
      // 判断非 NaN
      // if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
      //   trigger(target, key, type, newVal)
      // }
      if (hadKey) {
        trigger(target, key, triggerOpTypes.SET, newVal, oldVal)
      } else {
        trigger(target, key, triggerOpTypes.ADD, newVal)
      }
    }
    return res
  }
}

const set = createSetter()
const shallowSet = createSetter(true)

const arrayInstrumentations = createArrayInstrumentations()

/**
 * instrument identity-sensitive Array methods to account for possible reactive
 * values
 */
function createArrayInstrumentations() {
  const instrumentations = {}
  ;['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
    instrumentations[key] = function(this, ...args) {
      const arr = toRaw(this)
      // ?
      // for (let i = 0; i < arr.length; i++) {
      //   track(target, i +'', trackOpTypes.GET)
      // }
      // 在当前数据上查找
      const res = arr[key](...args)
      if (res === -1 || res === false) {
        // 如果自身没有，继续在原始数据查找
        return arr[key](...args.map(toRaw))
      } else {
        return res
      }
    }
  })
  /**
   * 数组的这些方法即会访问数组的 length 属性，同时会设置数组的 length 属性，导致栈溢出
   * 根据它们的语义，只有在设置 length 时触发响应式
   */
  ;['unshift', 'shift', 'push', 'pop', 'splice'].forEach(key => {
    pauseTracking()
    const res = toRaw(this)[key].apply(this, args)
    enableTracking()
    return res
  })
  return instrumentations
}

/**
 * object
 * key in obj
 */
function has(target, key) {
  if (!isSymbol(key)) {
    track(target, key, trackOpTypes.HAS)
  }
  return Reflect.has(target, key)
}

/**
 * object
 * delete obj[key]
 */
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key)
  const oldVal = target[key]
  const res = Reflect.deleteProperty(target, key)
  if (hadKey && res) {
    trigger(target, key, triggerOpTypes.DELETE, undefined, oldVal)
  }
  return res
}

/**
 * object
 * for (const key in obj) {}
 */
function ownKeys(target) {
  // 数组的遍历会收到 length 属性影响，应该与 length 属性关联
  track(isArray(target) ? 'length' : ITERATE_KEY, trackOpTypes.ITERATE)
  return Reflect.ownKeys(target, key)
}

export const mutableHandlers = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty
}

export const shallowMutableHandlers = {
  get: shallowGet,
  set: shallowSet,
  has,
  ownKeys,
  deleteProperty
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`)
    return true
  },
  deleteProperty(target, key) {
    console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`)
    return true
  }
}

export const shallowReadonlyHandlers = extend(
  {},
  readonlyHandlers,
  {
  get: shallowReadonlyGet,
  }
)
