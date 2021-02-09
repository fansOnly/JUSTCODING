import { observe } from '../observe/observe.js'
import { pushTarget, popTarget } from '../observe/dep.js'
import { nativeWatch, noop, isPlainObject } from '../utils/util.js'

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

export function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState(vm) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
        initData(vm)
    } else {
        observe(vm._data_ = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm. opts.computed)
    if(opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}

/**
 * 1. 初始化 props
 */
function initProps(vm, props) {
    console.log('init props')
}

/**
 * 2. 初始化 methods
 */
function initMethods(vm, methods) {
    console.log('init methods')
    for (const key in methods) {
        vm[key] = typeof methods[key] !== 'function' ? noop : methods[key].bind(vm)
    }
}

/**
 * 3. 初始化 data
 */
function initData(vm) {
    let data = vm.$options.data
    data = vm._data_ = typeof data === 'function' ? getData(vm, data) : data || {}
    if (!isPlainObject(data)) {
        data = {}
    }

    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
        const key = keys[i]
        proxy(vm, '_data_', key)
    }
    observe(data, true /* asRootData */)
}

/**
 * 4. 初始化 computed
 */
function initComputed(vm, computed) {
    console.log('init computed')
}

/**
 * 5. 初始化 watch
 */
function initWatch(vm, watch) {
    console.log('init watch')
}

export function getData(vm, data) {
    pushTarget()
    try {
        data.call(vm, vm)
    } catch (error) {
        console.log(error)
        return {}
    } finally {
        popTarget()
    }
}
