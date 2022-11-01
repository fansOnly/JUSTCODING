import { toNumber, isArray, isMap } from '../utils'

// 存储副作用函数的 “桶”
const targetMap = new WeakMap()
// 当前的副作用函数
let activeEffect
// 关联遍历的 key 值
export const ITERATE_KEY = Symbol()
// 关联 Map/Set keys 遍历的 key 值
export const MAP_KEY_ITERATE_KEY = Symbol()

// 副作用函数
export function effect(fn, options) {
  const effectFn = () => {
    cleanupEffect(effectFn)
    activeEffect = effectFn
    trackStack.push(effectFn)
    // let lastShouldTrack = shouldTrack
    const res = fn()
    trackStack.pop()
    activeEffect = trackStack[trackStack.length - 1]
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options?.lazy) {
    effectFn()
  }
  return effectFn
}

// 清除所有关联的副作用函数
function cleanupEffect(effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i > deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

/**
 * 追踪依赖
 * @param {*} target
 * @param {*} key
 * @param {*} type 关联的操作
 */
export function track(target, key, type) {
  if (!activeEffect || !shouldTrack) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

/**
 * 触发响应
 * @param {*} target
 * @param {*} key
 * @param {*} type 关联的操作
 * @param {*} newVal 新值
 * @param {*} oldVal 旧值
 */
export function trigger(target, key, type, newVal, oldVal) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  // 存储要运行的副作用函数
  const deps = []
  if (type === 'clear') {
    // Map/Set 的 clear
    // trigger all effects
    deps = [...depsMap.values()]
  } else if (key === 'length' && isArray(target)) {
    // 修改数组长度导致元素被删除
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= toNumber(newVal)) {
        deps.push(dep)
      }
    })
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      deps.push(depsMap.get(key))
    }

    // also run for iteration key on ADD | DELETE | Map.SET
    // trigger iterator effects
    if (type === 'ADD' || type === 'DELETE' || (isMap(target) && type === 'SET')) {
      deps.push(depsMap.get(ITERATE_KEY))
    }
    // trigger length effects
    if (type === 'ADD' && isArray(target)) {
      deps.push(depsMap.get('length'))
    }
    // trigger Map keys effects
    if (type === 'SET' && isMap(target)) {
      deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
    }
  }
  // 运行副作用函数
  deps.forEach(effect => {
    if (effect?.options?.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  })
}

export let shouldTrack = true
const trackStack = []

export function pauseTracking() {
  // trackStack.push(shouldTrack)
  shouldTrack = false
}

export function enableTracking() {
  // trackStack.push(shouldTrack)
  shouldTrack = true
}

export function resetTracking() {
  const last = trackStack.pop()
  shouldTrack = last === undefined ? true : last
}
