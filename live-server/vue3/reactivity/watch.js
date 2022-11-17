import { effect } from "./effect";
import { isRef } from './ref'
import { isReactive } from "./reactive";
import { NOOP, isFunction, isArray, isObject, isMap, isSet, isPlainObject } from '../utils'

/**
 * 
 * @param {*} source 
 * @param {*} cb 
 * @param {*} options 
 * @param {boolean} options.immediate
 * @param {boolean} [options.flush = pre]
 */
export function watch(source, cb, options) {
  let getter
  if (isRef(source)) {
    getter = source.value
  } else if (isReactive(source)) {
    getter = source
  } else if (isArray(source)) {
    // TODO 多监听源
    getter = () =>
      source.map(v => {
        if (isRef(v)) {
          return v.value
        } else if (isReactive(v)) {
          return traverse(v)
        } else if (isFunction(v)) {
          return v
        }
      })
  } else if (isFunction(source)) {
    getter = () => traverse(source)
  } else {
    getter = NOOP
  }

  let oldVal, newVal

  // 竞态问题，存储用户的过期回调
  let cleanup
  function onInvalidate(fn) {
    cleanup = fn
  }

  // 将调度函数流程提取出来
  const job = () => {
    // 在 scheduler 中重新执行副作用函数，拿到的是新值
    newVal = effectFn()
    // 在调用回调函数之前，清空过期回调
    if (cleanup) {
      cleanup()
    }
    cb(newVal, oldVal, onInvalidate)
    // 更新旧值，副作用函数执行完成后，新值就沦为旧值
    oldVal = newVal
  }
  const effectFn = effect(
    () => getter,
    {
      lazy: true,
      scheduler: () => {
        if (options?.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )
  if (options?.immediate) {
    job()
  } else {
    // 副作用函数是“懒”执行的，在外面手动调用副作用函数，得到的是旧值
    oldVal = effectFn()
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
