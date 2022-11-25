import { ReactiveEffect } from "./effect.js"
import { isRef } from "./ref.js"
import { isReactive, isShallow } from "./reactive.js"
import {
  NOOP,
  isFunction,
  isArray,
  isObject,
  isMap,
  isSet,
  isPlainObject,
  callWithErrorHandling,
  hasChanged,
} from "../utils/index.js"

const INITIAL_WATCHER_VALUE = {}

export function watchEffect(effect, options = {}) {
  return doWatch(effect, null, options)
} 

export function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn(
      `\`watch(fn, options?)\` signature has been moved to a separate API. ` +
        `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
        `supports \`watch(source, cb, options?) signature.`
    )
  }
  return doWatch(source, cb, options)
}

/**
 * @param {*} source
 * @param {*} cb
 * @param {object} options
 * @param {boolean} options.immediate
 * @param {boolean} options.deep
 * @param {boolean} [options.flush = pre]
 */
function doWatch(source, cb, { immediate, deep, flush }) {
  if (!cb) {
    if (immediate !== undefined) {
      console.warn(
        `watch() "immediate" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
    if (deep !== undefined) {
      console.warn(
        `watch() "deep" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
  }

  let instance = null
  let getter = () => { }
  let forceTrigger = false
  let isMultipleSource = false

  if (isRef(source)) {
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    getter = () => source
    deep = true // 响应式数据默认开启深度监听
  } else if (isArray(source)) {
    // TODO 多监听源
    isMultipleSource = true
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s))
    getter = () =>
      source.map((s) => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          return traverse(s)
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, "watcher getter")
        } else {
          console.warn(
            `Invalid watch source: `,
            s,
            `A watch source can only be a getter/effect function, a ref, ` +
              `a reactive object, or an array of these types.`
          )
        }
      })
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, "watcher getter")
    } else {
      // no cb, simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup()
        }
        return callWithErrorHandling(source, instance, "watcher callback")
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

  // 存储用户的过期回调
  // 解决竞态问题
  let cleanup
  function onCleanup(fn) {
    cleanup = effect.onStop = () => callWithErrorHandling(fn, instance, "watcher cleanup")
  }

  let oldValue = isMultipleSource
    ? new Array(source.length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE

  // 将调度函数流程提取出来
  const job = () => {
    if (!effect.active) return
    if (cb) {
      // watch(source, cb)
      // 在 scheduler 中执行副作用函数，拿到的是新值
      const newValue = effect.run()
      if (
        deep ||
        forceTrigger ||
        (isMultipleSource
          ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
          : hasChanged(newValue, oldValue))
      ) {
        // 在调用回调函数之前，清空过期回调
        if (cleanup) {
          cleanup()
        }
        callWithErrorHandling(cb, instance, "watcher callback", [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ||
            (isMultipleSource && oldValue[0] === INITIAL_WATCHER_VALUE)
            ? undefined
            : oldValue,
          onCleanup,
        ])
        // 更新旧值，副作用函数执行完成后，新值就沦为旧值
        // TODO 引用类型？
        oldValue = newValue
      }
    } else {
      // watchEffect
      effect.run()
    }
  }

  let scheduler
  if (flush === "sync") {
    scheduler = job
  } else if (flush === "post") {
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

  const effect = new ReactiveEffect(getter, scheduler)

  if (cb) {
    if (immediate) {
      job()
    } else {
      // 副作用函数是“懒”执行的，在外面手动调用副作用函数，得到的是旧值
      oldValue = effect.run()
    }
  } else {
    effect.run()
  }

  return () => {
    effect.stop()
  }
}

// this.$watch
export function instanceWatch(source, value, options) {}

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
    value.forEach((v) => {
      traverse(v, seen)
    })
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen)
    }
  }
  return value
}
