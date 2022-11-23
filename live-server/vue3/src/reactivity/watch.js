import { effect } from "./effect.js"
import { isRef } from './ref.js'
import { isReactive, isShallow } from "./reactive.js"
import { NOOP, isFunction, isArray, isObject, isMap, isSet, isPlainObject, callWithErrorHandling } from '../utils/index.js'

/**
 * @param {*} source 
 * @param {*} cb 
 * @param {*} options 
 * @param {boolean} options.immediate
 * @param {boolean} [options.flush = pre]
 */
export function watch(source, cb, { immediate, deep, flush }) {
  let instance = null
  let getter = () => { }
  let forceTrigger = false
  let isMultipleSource = false

  if (isRef(source)) {
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    getter = () => source
    deep = true
  } else if (isArray(source)) {
    // TODO 多监听源
    isMultipleSource = true
    forceTrigger = source.some(s => isReactive(s) || isShallow(s))
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          return traverse(s)
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, 'watcher getter')
        }
      })
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 'watcher getter')
    } else {
      // no cb, simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup()
        }
        return callWithErrorHandling(source, instance, 'watcher callback')
      }
    }
  } else {
    getter = NOOP
  }

  if (cb && deep) {
    // 深度监听
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }

  // 竞态问题，存储用户的过期回调
  let cleanup
  function onCleanup(fn) {
    cleanup = () => callWithErrorHandling(fn, instance, 'watcher cleanup')
  }

  let oldVal = isMultipleSource ? new Array(source.length).fill({}) : {}

  // 将调度函数流程提取出来
  const job = () => {
    if (cb) {
      // watch(source, cb)
      // 在 scheduler 中执行副作用函数，拿到的是新值
      const newVal = effectFn()
      console.log('newVal: ', newVal);
      if (deep || forceTrigger) {
        // 在调用回调函数之前，清空过期回调
        if (cleanup) {
          cleanup()
        }
        callWithErrorHandling(cb, instance, 'watcher callback', [newVal, oldVal, onCleanup])
        // 更新旧值，副作用函数执行完成后，新值就沦为旧值
        oldVal = newVal
      }
    } else {
      // watchEffect
      effectFn()
    }
  }

  let scheduler
  if (flush === 'sync') {
    scheduler = job
  } else if (flush === 'post') {
    scheduler = () => {
      const p = Promise.resolve()
      p.then(job)
    }
  } else {
    // default = pre
    if (instance) {
      job.id = instance.uid
    }
    scheduler = job
  }

  const effectFn = effect(
    () => getter,
    {
      lazy: true,
      scheduler
    }
  )

  if (cb) {
    if (immediate) {
      job()
    } else {
      // 副作用函数是“懒”执行的，在外面手动调用副作用函数，得到的是旧值
      oldVal = effectFn()
    }
  } else {
    effectFn()
  }
}

/**
 * 递归的遍历对象属性，关联副作用函数时，确保每个属性都能监听到
 * @param {*} value 
 * @param {*} seen 
 */
function traverse(value, seen = new Set()) {
  if (!isObject(value) || seen.has(value)) return
  seen.add(value)
  if (isRef(value)) {
    traverse(value.value, seen)
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen)
    }
  } else if (isMap(value) || isSet(value)) {
    value.forEach(v => {
      traverse(v, seen)
    })
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen)
    }
  }
  return value
}
