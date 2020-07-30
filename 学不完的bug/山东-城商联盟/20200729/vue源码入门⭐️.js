

function noop(a, b, c) { }

var _toString = Object.prototype.toString
function isPlainObject(obj) {
    return _toString.call(obj) === "[object Object]"
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

/**
   * Check if a string starts with $ or _
   */
function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
}

function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

var warn = noop

var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

var hasProto = '__proto__' in {}

var arrayProto = Array.prototype
var arrayMethods = Object.create(arrayProto)

/*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */

var methodsToPatch = [
    "pop",
    "push",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
]
/**
   * Intercept mutating methods and emit events
   */
methodsToPatch.forEach(function(method) {
    // cache original method
    var original = arrayProto[method]
    def(arrayMethods, method, function mutator() {
        var args = [], len = arguments.length
        while (len--) args[len] = arguments[len]

        var result = original.apply(this, args)
        var ob = this.__ob__
        var inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.splice(2)
                break;
        }
        if (inserted) observeArray(inserted)
        // notify change
        ob.dep.notify()
        return result
    })
})

var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
var shouldObserve = true

function toggleObserving(value) {
    shouldObserve = value
}

/**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
var Observer = function Observer(value) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__proto__', this)
    if (Array.isArray(value)) {
        if (hasProto) {
            protoAugment(value, arrayMethods)
        } else {
            copyAugment(value, arrayMethods, arrayKeys)
        }
        this.observeArray(value)
    } else {
        this.walk(value)
    }
}

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
    for (var i = 0, len = items.length; i < len; i++) {
        observe(items[i])
    }
}

/**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
Observer.prototype.walk = function walk(obj) {
    var keys = Object.keys(obj)
    for (var i = 0; i < keys.length; i++) {
        defineReactive$$1(obj, keys[i])
    }
}

/**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   */
function protoAugment(target, src) {
    target.__proto__ = src
}

/**
   * Augment a target Object or Array by defining
   * hidden properties.
   */
function copyAugment(target, src, keys) {
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        def(target, key, src[key])
    }
}

/**
  * Attempt to create an observer instance for a value,
  * returns the new observer if successfully observed,
  * or the existing observer if the value already has one.
  */
function observe(value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
        return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        if (
            shouldObserve &&
            !isServerRendering() &&
            (Array.isArray(value) || isPlainObject(value)) &&
            value.isExtensible() &&
            !value._isVue
        ) {
            ob = new Observer(value)
        }
        if (asRootData && ob) {
            ob.vmCount++
        }
    }
    return ob
}

/**
   * Define a reactive property on an Object.
   */
function defineReactive$$1(obj, key, val, customSetter, shadow) {
    var dep = new Dep()
    var property = Object.getOwnPropertyDescriptor(obj)
    if (property && property.configurable === false) {
        return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get
    var setter = property && property.set
    if ((!getter || setter) && arguments.length == 2) {
        val = obj[key]
    }

    var childOb = !shadow && observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            var value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            var value = getter ? getter.call(obj) : val
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            if (customSetter) {
                customSetter()
            }
            if (getter && !setter) return
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            childOb = !shadow && observe(newVal)
            dep.notify()
        }
    })
}

function dependArray(value) {
    for (var e = (void 0), i = 0, len = value.length; i < len; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}


var uid = 0
/**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
function Dep() {
    this.id = uid++
    this.subs = []
}

Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub)
}

Dep.prototype.removeSub = function removeSub(sub) {
    remove(this.subs, sub)
}

Dep.prototype.depend = function deppend() {
    if (Dep.target) {
        Dep.target.addDep(this)
    }
}

Dep.prototype.notify = function notify() {
    // stabilize the subscriber list first
    var subs = this.subs.slice()
    if (!config.async) {
        // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
        subs.sort(function(a, b) {
            return a.id - b.id
        })
    }
    for (var i = 0; i < subs.length; i++) {
        subs[i].update()
    }
}

// The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
Dep.target = null
var targetStack = []

function pushTarget(target) {
    targetStack.push(target)
    Dep.target = target
}

function popTarget(target) {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}

function remove(arr, item) {}

function isServerRendering() { }


// 初始化  init
var uid$3 = 0;
Vue.prototype._init = function (options) {
    var vm = this
    vm.uuid = uid$3++

    // a flag to avoid this being observed
    vm._isVue = true

    // merge options
    if (options && options._isComponent) {
        initInternalComponent(options)
    } else {
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
        )
    }
    // istanbul ignore else
    {
        initProxy(vm)
    }

    // expose real self
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initState(vm)
    initInjections(vm)
    callHook(vm, 'created')

    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
}

function initState(vm) {
    vm._watchers = []
    var opts = vm.$options
    if (opts.props) {
        initProps(vm, opts.props)
    }
    if (opts.methods) {
        initMethods(vm, opts.methods)
    }
    if (opts.data) {
        initData(vm)
    } else {
        observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) {
        initComputed(vm, opts.computed)
    }
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}

function initProps(vm, propsOptions) { }

function initData(vm) {
    var data = vm.$options.data
    data = vm._data = typeof data === 'function' ? getData(vm, data) : data || {}
    if (!isPlainObject(data)) {
        data = {}
        warn(
            'data functions should return an object:\n' +
            'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
            vm
        );
    }
    // proxy data on instance
    var keys = Object.keys(data)
    var props = vm.$options.props
    var methods = vm.$options.methods
    var i = keys.length
    while (i--) {
        var key = keys[i]
        if (methods && hasOwn(methods, key)) {
            warn(
                ("Method \"" + key + "\" has already been defined as a data property."),
                vm
            );
        }
        if (props && hasOwn(props, key)) {
            warn(
                "The data property \"" + key + "\" is already declared as a prop. " +
                "Use prop default value instead.",
                vm
            );
        } else if (!isReserved(key)) {
            proxy(vm, '_data', key)
        }
    }
    // observe data
    observe(data, true /* asRootData */)
}


function getData(vm, data) {
    // #7573 disable dep collection when invoking data getters
    pushTarget()
    try {
        data.call(vm, vm)
    } catch (e) {
        handleError(e, vm, 'data()')
        return {}
    } finally {
        popTarget()
    }
}

function initProxy(vm) { }

function pushTarget() { }

function popTarget() { }

function handleError(error, vm, info) { }

function initInternalComponent(vm, options) { }

function mergeOptions(parent, child, vm) { }

function resolveConstructorOptions(ctor) { }
