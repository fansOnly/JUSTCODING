import { def, isObject, toRawType } from '../utils/index.js'
import { reactiveFlags } from './constants.js'
import { mutableHandlers, shallowMutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from './baseHandlers.js'
import {
  mutableCollectionHandlers,
  readonlyCollectionHandlers,
  shallowCollectionHandlers,
  shallowReadonlyCollectionHandlers
} from './collectionHandlers.js'

function targetTypeMap(rawType) {
  switch(rawType) {
    case 'Object':
    case 'Array':
      return 0
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 1
    default:
      return 2
  }
}

function getTargetType(value) {
  return targetTypeMap(toRawType(value))
}

const reactiveMap = new WeakMap()
const shallowReactiveMap = new WeakMap()
const readonlyMap = new WeakMap()
const shallowReadonlyMap = new WeakMap()

export function reactive(obj) {
  return createReactive(obj, false, mutableHandlers, mutableCollectionHandlers, reactiveMap)
}

export function shallowReactive(obj) {
  return createReactive(obj, false, shallowMutableHandlers, shallowCollectionHandlers, shallowReactiveMap)
}

export function readonly(obj) {
  return createReactive(obj, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap)
}

export function shallowReadonly(obj) {
  return createReactive(obj, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap)
}

/**
 * 创建响应式
 * @param {*} target 
 * @param {*} isReadonly 
 * @param {*} baseHandlers 
 * @param {*} collectionHandlers 
 * @param {*} proxyMap 
 */
function createReactive(target, isReadonly = false, baseHandlers, collectionHandlers, proxyMap) {
  const existProxy = proxyMap.get(target)
  if (existProxy) return existProxy

  if (isReadonly) return target

  const targetType = getTargetType(target)
  console.log('targetType: ', targetType);
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}

export function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[reactiveFlags.RAW])
  }
  return value && value[reactiveFlags.RAW]
}

export function isReadonly(value) {
  return value && value[reactiveFlags.IS_READONLY]
}

export function isShallow(value) {
  return value && value[reactiveFlags.IS_SHALLOW]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

export function toRaw(value) {
  const raw = value && value[reactiveFlags.RAW]
  return raw ? toRaw(raw) : value
}

export function toReactive(value) {
  return isObject(value) ? reactive(value) : value
}

export function toReadonly(value) {
  return isObject(value) ? readonly(value) : value
}

export function markRaw(value) {
  def(value, reactiveFlags.SKIP, true)
  return value
}
