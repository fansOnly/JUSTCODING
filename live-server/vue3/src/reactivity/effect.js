import { toNumber, isArray, isMap, extend } from '../utils/index.js'

// 存储副作用函数的 “桶”
const targetMap = new WeakMap()
// 当前的副作用函数
let activeEffect
// 关联遍历的 key 值
export const ITERATE_KEY = Symbol('iterate')
// 关联 Map/Set keys 遍历的 key 值
export const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate')

export class ReactiveEffect {
  constructor(fn, scheduler) {
    this.active = true
    this.deps = []
    this.parent = undefined
    this.deferStop = false
    this.onStop = () => {}

    this.fn = fn
    this.scheduler = scheduler
  }

  run() {
    if (!this.active) {
      return this.fn()
    }
    let parent = activeEffect
    let lastShouldTrack = shouldTrack
    while (parent) {
      if (parent === this) {
        return
      }
      parent = parent.parent
    }

    try {
      this.parent = activeEffect
      activeEffect = this
      shouldTrack = true

      return this.fn()
    } finally {
      activeEffect = this.parent
      shouldTrack = lastShouldTrack
      this.parent = undefined

      if (this.deferStop) {
        this.stop()
      }
    }
  }

  stop() {
    // stopped while running itself - defer the cleanup
    if (activeEffect === this) {
      this.deferStop = true
    } else if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

// 副作用函数
export function effect(fn, options) {
  // if (fn.effect) {
  //   fn = fn.effect.fn
  // }

  const _effect = new ReactiveEffect(fn)
  if (options) {
    extend(_effect, options)
  }
  if (!options || !options.lazy) {
    _effect.run()
  }
  const runner = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

// export function effect2(fn, options) {
//   const effectFn = () => {
//     cleanupEffect(effectFn)
//     activeEffect = effectFn
//     trackStack.push(effectFn)
//     const res = fn()
//     trackStack.pop()
//     activeEffect = trackStack[trackStack.length - 1]
//     return res
//   }
//   effectFn.options = options
//   effectFn.deps = []
//   if (!options?.lazy) {
//     effectFn()
//   }
//   return effectFn
// }

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
 * @param {*} type 关联的操作类型
 */
export function track(target, key, type) {
  if (activeEffect && shouldTrack) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }

    trackEffects(dep)
  }
}

export function trackEffects(dep) {
  let shouldTrack = false
  shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export let shouldTrack = true
const trackStack = []

export function pauseTracking() {
  trackStack.push(shouldTrack)
  shouldTrack = false
}

export function enableTracking() {
  trackStack.push(shouldTrack)
  shouldTrack = true
}

export function resetTracking() {
  const last = trackStack.pop()
  shouldTrack = last === undefined ? true : last
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

  if (deps.length === 1) {
    if (deps[0]) {
      triggerEffects(deps[0])
    }
  } else {
    const effects = []
    for (const dep of deps) {
      if (dep) {
        effects.push(dep)
      }
    }
    // 运行副作用函数
    triggerEffects(new Set(effects))
  }
}

export function triggerEffects(dep) {
  const effects = isArray(dep) ? dep : [...dep]
  for (const effect of effects) {
    triggerEffect(effect)
  }
}

function triggerEffect(effect) {
  if (effect && effect !== activeEffect) {
    if (effect?.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
