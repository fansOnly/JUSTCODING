import { ITERATE_KEY, MAP_KEY_ITERATE_KEY, track, trigger } from "./effect.js"
import { trackOpTypes, triggerOpTypes, reactiveFlags } from "./constants.js"
import { toRaw, reactive, toReadonly, toReactive, isShallow } from './reactive.js'
import { hasOwn, isMap, isObject } from "../utils/index.js"

const getProto = key => Reflect.getPrototypeOf(key)
const toShallow = value => value

/**
 * Map
 */
function get(target, key, isReadonly = false, shallow = false) {
  target = this[reactiveFlags.RAW]
  const rawTarget = toRaw(target)
  const { has } = getProto(rawTarget)
  const rawKey = toRaw(ket)
  const had = has.call(target, key)
  if (!isReadonly) {
    if (key !== rawKey) {
      track(rawTarget, key, trackOpTypes.GET)
    }
    track(rawTarget, rawKey, trackOpTypes.GET)
  }
  if (had) {
    const res = target.get(ket)
    return isObject(res) ? reactive(res) : res
  }
 }

function has(key, isReadonly = false) {
  const target = this[reactiveFlags.RAW]
  const rawTarget = toRaw(target)
  const rawKey = toRaw(key)
  if (!isReadonly) {
    if (key !== rawKey) {
      track(rawTarget, key, trackOpTypes.HAS)
    }
    track(rawTarget, rawKey, trackOpTypes.HAS)
  }
  return key === rawKey ?
    target.has(key) :
    target.has(key) || target.has(rawKey)
}

/**
 * Set
 */
function add(value) {
  value = toRaw(value)
  const target = toRaw(this)
  const has = target.has(value)
  if (!has) {
    target.add(value)
    trigger(target, key, triggerOpTypes.ADD, value, value)
  }
  return this
}

/**
 * Map
 */
function set(key, value) {
  value = toRaw(value)
  const target = toRaw(this)
  const { has, get } = getProto(target)
  let hadKey = has.call(target, key)
  if (!hadKey) {
    key = toRaw(key)
    hadKey = has.call(target, rawKey)
  }
  const oldVal = get.call(target, key)
  target.set(key, value)
  if (!hadKey) {
    trigger(target, key, triggerOpTypes.ADD, value)
  } else {
    trigger(target, key, triggerOpTypes.SET, value, oldVal)
  }
  return this
}

function size(target, isReadonly = false) {
  target = target[reactiveFlags.RAW]
  !isReadonly && track(toRaw(target), ITERATE_KEY, trackOpTypes.ITERATE)
  return Reflect.get(target, 'size', target)
}

function deleteKey(key) {
  const target = toRaw(this)
  const { has, get } = getProto(rawTarget)
  let hadKey = has.call(target, key)
  if (!hadKey) {
    key = toRaw(key)
    hadKey = has.call(target, key)
  }
  const oldVal = get ? get.call(target, key) : undefined
  const res = target.delete(key)
  if (hadKey) {
    trigger(target, key, triggerOpTypes.DELETE, undefined, oldVal)
  }
  return res
}

function clear() {
  const target = toRaw(this)
  const hasItems = target.size !== 0
  const oldTarget = isMap(target) ? new Map(target) : new Set(target)
  const res = target.clear()
  if (hasItems) {
    trigger(target, undefined, triggerOpTypes.CLEAR, undefined, oldTarget)
  }
  return res
}

/**
 * forEach
 */
function createForEach(isReadonly = false, isShallow = false) {
  return function(callback, thisArg) {
    const target = this[reactiveFlags.RAW]
    const rawTarget = toRaw(target)
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive
    !isReadonly && track(rawTarget, ITERATE_KEY, trackOpTypes.ITERATE)
    target.forEach((value, key) => {
      // important: make sure the callback is
      // 1. invoked with the reactive map as `this` and 3rd arg
      // 2. the value received should be a corresponding reactive/readonly.
      return callback.call(thisArg, wrap(value), wrap(key), this)
    })
  }
}

/**
 * 统一的迭代器生成方法
 */
function createIterableMethod(method, isReadonly = false, isShallow = false) {
  return function (...args) {
    const target = this[reactiveFlags.RAW]
    const rawTarget = toRaw(target)
    const targetIsMap = isMap(rawTarget)
    const isPair = method === 'entries' || (targetIsMap && method === Symbol.iterator)
    // keys 迭代器只关心键的变化
    const isKeyOnly = method === 'keys' && targetIsMap
    const innerIterator = target[method](...args)
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive
    if (!isReadonly) {
      track(target, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY)
    }
    return {
      // 实现迭代器协议
      next() {
        const { value, done } = innerIterator.next()
        return done ? {
          value, // undefined
          done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        }
      },
      // 实现可迭代协议
      [Symbol.iterator]() {
        return this
      }
    }
  }
}

function createReadonlyMethod(method) {
  return function(...args) {
    return method === triggerOpTypes.DELETE ? false : this
  }
}

function createInstrumentations () {
  const mutableInstrumentations = {
    get(key) {
      return get(this, key)
    },
    get size() {
      return size(this)
    },
    has,
    add,
    set,
    delete: deleteKey,
    clear,
    forEach: createForEach
  }

  const shallowInstrumentations = {
    get(key) {
      return get(this, key, false, true)
    },
    size() {
      return size(this)
    },
    has,
    set,
    add,
    delete: deleteKey,
    clear,
    forEach: createForEach(false, true)
  }

  const readonlyInstrumentations = {
    get(key) {
      return get(this, key, true)
    },
    size() {
      return size(this, true)
    },
    has(key) {
      return has.call(this, key, true)
    },
    add: createReadonlyMethod(triggerOpTypes.ADD),
    set: createReadonlyMethod(triggerOpTypes.SET),
    delete: createReadonlyMethod(triggerOpTypes.DELETE),
    clear: createReadonlyMethod(triggerOpTypes.CLEAR),
    forEach: createForEach(true)
  }

  const shallowReadonlyInstrumentations = {
    get(key) {
      return get.call(this, key, true, true)
    },
    size() {
      return size(this, true)
    },
    has(key) {
      return has.call(this, key, true)
    },
    add: createReadonlyMethod(triggerOpTypes.ADD),
    set: createReadonlyMethod(triggerOpTypes.SET),
    delete: createReadonlyMethod(triggerOpTypes.DELETE),
    clear: createReadonlyMethod(triggerOpTypes.CLEAR),
    forEach: createForEach(true, true)
  }

  const iteratorMethods = ['entries', 'values', 'keys', Symbol.iterator]

  iteratorMethods.forEach(method => {
    mutableInstrumentations[method] = createIterableMethod(method)
    shallowInstrumentations[method] = createIterableMethod(method, false, true)
    readonlyInstrumentations[method] = createIterableMethod(method, true)
    shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true)
  })

  return {
    mutableInstrumentations,
    shallowInstrumentations,
    readonlyInstrumentations,
    shallowReadonlyInstrumentations
  }
}

const {
  mutableInstrumentations,
  shallowInstrumentations,
  readonlyInstrumentations,
  shallowReadonlyInstrumentations
} = createInstrumentations()

function createInstrumentationGetter(isReadonly = false, shallow = false) {
  const instrumentations = shallow
    ? isReadonly
      ? shallowReadonlyInstrumentations
      : shallowInstrumentations
    : isReadonly
      ? readonlyInstrumentations
      : mutableInstrumentations

    return function(target, key, receiver) {
      if (key === reactiveFlags.IS_REACTIVE) {
        return !isReadonly
      } else if (key === reactiveFlags.IS_READONLY) {
        return isReadonly
      } else if (key === reactiveFlags.RAW) {
        return target
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target
        ? instrumentations
        : target,
        key,
        receiver
      )
    }
}

export const mutableCollectionHandlers = {
  get: createInstrumentationGetter()
}

export const shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
}

export const readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true)
}

export const shallowReadonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, true)
}
