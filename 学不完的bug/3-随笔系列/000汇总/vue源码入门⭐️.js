

var config = ({
    optionMergeStrategies: Object.create(null),
    silent: false,
    productionTip: 'development' !== 'production',
    devtools: 'development' !== 'production',
    performance: false,
    errorHandler: null,
    warnHandler: null,
    ignoredElements: [],
    keyCodes: Object.create(null),
    isReservedTag: no,
    isReservedAttr: no,
    isUnknownElement: no,
    getTagNamespace: noop,
    parsePlatformTagName: identity,
    mustUseProp: no,
    async: true,
    // _lifecycleHooks: LIFECYCLE_HOOKS
})

function noop(a, b, c) { }
function no(a, b, c) { return false; }
function identity(_) { return _; }

var _toString = Object.prototype.toString
function isPlainObject(obj) {
    return _toString.call(obj) === "[object Object]"
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

/**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */
function polyfillBind(fn, ctx) {
    function boundFn(a) {
        var l = arguments.length
        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx)
    }
    boundFn._length = fn.length
    return boundFn
}

function nativeBind(fn, ctx) {
    return fn.bind(ctx)
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind

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

// can we use __proto__ ?
var hasProto = '__proto__' in {}

// Browser enviroment sniffing
var inBrowser = typeof window !== 'undefined'
var inWeex = typeof WxEnvironment !== 'undefined' && !!WxEnvironment.platform
var weexPlatform = inWeex && WxEnvironment.platform.toLowerCase()
var UA = inBrowser && window.navigator.userAgent.toLowerCase()
var isIE = UA && /msie|trident/.test(UA)
var isIE9 = UA && UA.indexOf('msie 9.0') > 0
var isEdge = UA && UA.index('edge/') > 0
var isAndroid = (UA && UA.index('android') > 0) || (weexPlatform === 'android')
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
var isChrome = (UA && /chrome\/\d+/.test(UA)) && !isEdge
var isPhantomJs = UA && /phantomjs/.test(UA)
var isFF = UA && /firefox\/(\d)+/.test(UA)

// firefox has a "watch" function on Object.property
var nativeWatch = ({}).watch

var supportsPassive = false
if (inBrowser) {
    try {
        var opts = {}
        Object.defineProperty(opts, {
            get: function get() {
                supportsPassive = true
            }
        })
        // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts)
    } catch (error) { }
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer
var isServerRendering = function () {
    if (_isServer === undefined) {
        if (!inBrowser && !inWeex && typeof _isServer !== 'undefined') {
            // detect presence of vue-server-rendererand avoid
            // Webpack shimming the process
            _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
        } else {
            _isServer = false
        }
    }
    return _isServer
}

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

function isNative(Cotr) {
    return typeof Cotr === 'function' && /native code/.test(Cotr.toString)
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

var _Set

if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available
    _Set = Set
} else {
    // a non-standard Set polyfill that only works with primitive keys
    _Set = /*@__PURE__*/(function () {
        function Set() {
            return Object.create(null)
        }
        Set.prototype.has = function has(key) {
            return this.set[key] === true
        }
        Set.prototype.add = function add(key) {
            this.set[key] = true
        }
        Set.prototype.clear = function clear() {
            this.set = Object.create(null)
        }
        return Set
    }())
}



var warn = noop
var tip = noop
var generateComponentTrace = (noop)
var formatComponentName = (noop)



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
methodsToPatch.forEach(function (method) {
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
        subs.sort(function (a, b) {
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

function popTarget() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}



uid$2 = 0
/**
 * A watcher parsesn expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used fro both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm
    if (isRenderWatcher) {
        vm._watcher = this
    }
    vm.watchers.push(this)
    if (options) {
        this.deep = !!options.deep
        this.user = !!options.user
        this.lazy = !!options.lazy
        this.sync = !!options.sync
        this.before = options.before
    } else {
        this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.uid = ++uid$2 // uid fro betching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new _Set()
    this.newDepIds = new _Set()
    this.expression = expOrFn.toString()
    // parse expression for getter
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn
    } else {
        this.getter = parsePath(expOrFn)
        if (!this.getter) {
            this.getter = noop
            warn(
                "Failed watching path: \"" + expOrFn + "\" " +
                'Watcher only accepts simple dot-delimited paths. ' +
                'For full control, use a function instead.',
                vm
            )
        }
    }
    this.value = this.lazy ? undefined : this.get()
}

/**
 * Evaluate the getter and re-collect dependencies
 */
Watcher.prototype.get = function get() {
    pushTarget(this)
    var value
    var vm = this.vm
    try {
        value = this.getter.call(vm, vm)
    } catch (e) {
        if (this.user) {
            handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""))
        } else {
            throw e
        }
    } finally {
        // "touch" every property so they are all tracked as
        // dependencies from deep watching
        if (this.deep) {
            traverse(value)
        }
        popTarget()
        this.cleanupDeps();
    }
    return value
}

/**
 * Add a dependency for this directive
 */
Watcher.prototype.addDep = function addDep(dep) {
    var id = dep.id
    if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id)
        this.newDeps.push(dep)
        if (!this.depIds.has(id)) {
            dep.addSub(this)
        }
    }
}

/**
 * Clean up for dependency collection
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
    var i = this.deps.length
    while (i--) {
        var dep = this.deps[i]
        if (!this.newDepIds.has(dep.id)) {
            dep.removeSub(this)
        }
    }
    var tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
}

/**
 * Subscriber interface will be called when a dependency changes
 */
Watcher.prototype.update = function update() {
    if (this.lazy) {
        this.dirty = true
    } else if (this.sync) {
        this.run()
    } else {
        queueWatcher(this)
    }
}

/**
 * Scheduler job interface
 * Will be called by the scheduler
 */
Watcher.prototype.run = function run() {
    if (this.active) {
        var value = this.get()
        if (
            value !== this.value ||
            // Deep watchers and watchers on Array/Object should fire even
            // when the value is the same, because the value may have mutated
            isObject(value) ||
            this.deep
        ) {
            // set new value
            var oldValue = this.value
            this.value = value
            if (this.user) {
                try {
                    this.cb.call(this.vm, value, oldValue)
                } catch (e) {
                    handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""))
                }
            } else {
                this.cb.call(this.vm, value, oldValue)
            }
        }
    }
}

/**
 * Evaluate the value of the watcher
 * this only gets called for lazy watchers
 */
Watcher.prototype.evaluate = function evaluate() {
    this.value = this.get()
    this.dirty = false
}

/**
 * Depend on all deps collected by this watcher
 */
Watcher.prototype.depend = function depend() {
    var i = this.deps.length
    while (i--) {
        this.deps[i].depend()
    }
}

/**
 * Remove self from all dependedcies' subscriber list
 */
Watcher.prototype.teardown = function teardown() {
    if (this.active) {
        // remove self from vm's watcher list
        // this is somewhat expensive operation so we skip it
        // if the vm is being destroyed 
        if (!this.vm._isBeingDestroyed) {
            remove(this.vm._watchers, this)
        }
        var i = this.deps.length
        while (i--) {
            this.deps.removeSub(this)
        }
        this.active = false
    }
}

function traverse() { }

function queueWatcher() { }

function parsePath() { }


/**
   * Remove an item from an array.
   */
function remove(arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

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
    initProvide(vm) // resolve provide after data/props

    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
}

/**
 * 初始化事件
 */
function initEvents(vm) {
    vm._events = Object.create(null)
    vm._hasHookEvent = false
    var listeners = vm.$options._parentListeners
    if (listeners) {
        updateComponentListeners(vm, listeners)
    }
}

/**
 * 初始化数据
 */
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

var isUpdatingChildComponent = false

function initProps(vm, propsOptions) {
    var propsData = vm.$options.propsData || {}
    var props = vm._props || {}
    // cache prop keys so that futrue props updates can iterate using Array
    // instead of dynamic object key enumeration
    var keys = vm.$options._propKeys || []
    var isRoot = !vm.$parent
    // root instance props should be converted
    if (!isRoot) {
        toggleObserving(false)
    }
    var loop = function (key) {
        keys.push(key)
        var value = validateProp(key, propsOptions, propsData, vm)
        {
            var hyphenatedKey = hyphenate(key)
            if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
                warn(
                    ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
                    vm
                )
            }
            defineReactive$$1(props, key, value, function () {
                if (!isRoot && !isUpdatingChildComponent) {
                    warn(
                        "Avoid mutating a prop directly since the value will be " +
                        "overwritten whenever the parent component re-renders. " +
                        "Instead, use a data or computed property based on the prop's " +
                        "value. Prop being mutated: \"" + key + "\"",
                        vm
                    )
                }
            })
        }
    }
    // static props are already proxied on component's property during Vue.extend().
    //  We only need to proxy props definded at instantiation here.
    if (!(key in vm)) {
        proxy(vm, '_props', key)
    }
    for (let key in propsOptions) { loop(key) }
    toggleObserving(true)
}

function initMethods(vm, methods) {
    var props = vm.$options.props
    for (var key in methods) {
        if (typeof methods[key] !== 'function') {
            warn(
                "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
                "Did you reference the function correctly?",
                vm
            )
        }
        if (props && hasOwn(props, key)) {
            warn(
                ("Method \"" + key + "\" has already been defined as a prop."),
                vm
            )
        }
        if ((key in vm) && isReserved(key)) {
            warn(
                "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
                "Avoid defining component methods that start with _ or $."
            )
        }
        vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
    }
}

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

var computedWatcherOptions = { lazy: true }

function initComputed(vm, computed) {
    var watchers = vm._computedWatchers = Object.create(null)
    // computed watchers are just getters during ssr
    var isSSR = isServerRendering()

    for (var key in computed) {
        var userDef = computed[key]
        var getter = typeof userDef === 'function' ? userDef : userDef.get
        if (getter === null) {
            warn(
                ("Getter is missing for computed property \"" + key + "\"."),
                vm
            )
        }
        if (!isSSR) {
            // create internal watcher for the computed propperty
            watchers[key] = new Watcher({
                vm,
                getter: noop,
                noop,
                computedWatcherOptions
            })
        }
        // component-defined properties are already defined on the computed propertype.
        // We only need to define computed properties defined at instantiation here.
        if (!(key in vm)) {
            defineComputed(vm, key, userDef)
        } else {
            if (key in vm.$data) {
                warn(("The computed property \"" + key + "\" is already defined in data."), vm)
            } else if (vm.$options.props && key in vm.$options.props) {
                warn(("The computed property \"" + key + "\" is already defined as a prop."), vm)
            }
        }
    }
}

function defineComputed(target, key, userDef) {
    var shoudCache = !isServerRendering()
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = shoudCache ? createComputedGetter(key) : createGetterInvoker(userDef)
        sharedPropertyDefinition.set = noop
    } else {
        sharedPropertyDefinition.get = userDef.get ? shoudCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop
        sharedPropertyDefinition.set = userDef.set || noop
    }
    if (sharedPropertyDefinition.set === noop) {
        sharedPropertyDefinition.set = function () {
            warn(
                ("Computed property \"" + key + "\" was assigned to but it has no setter."),
                this
            )
        }
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(key) { }

function createGetterInvoker(userDef) { }

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

function validateProp() { }

function pushTarget() { }

function popTarget() { }

function handleError(error, vm, info) { }

function initInternalComponent(vm, options) { }

function mergeOptions(parent, child, vm) { }

function resolveConstructorOptions(ctor) { }

/**
  * Make a map and return a function for checking if a key
  * is in that map.
  */
function makeMap(str, expectsLowerCase) {
    var map = Object.create(null)
    var list = str.split(',')
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase ? function (val) {
        return map[key.toLowerCase()]
    } : function (val) {
        return map[key]
    }
}

/**
   * Check if an attribute is a reserved attribute.
   */
var isReservedAttribute = makeMap('key, ref, slot, slot-scope, is')

/**
   * Create a cached version of a pure function.
   */
function cached(fn) {
    var cache = Object.create(null)
    return function cacheFn(str) {
        var hit = cache[str]
        return hit || (cache[str] = fn(str))
    }
}

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g
var hyphenated = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
})
