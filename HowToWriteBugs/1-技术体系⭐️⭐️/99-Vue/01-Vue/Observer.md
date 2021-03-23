#### 发布者 Observer

---

##### 一、属性

+ value：观察的值

+ dep：调度实例

+ vmCount：根实例数量

##### 二、方法

+ walk：观察对象 - defineReactive

+ observeArray：观察数组 - observe

```js
class Observe {
    value: any;
    dep: Dep;
    vmCount: number;

    constructor(value: any) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        // 为当前的属性绑定 __ob__ 原型属性
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            if (hasProto(value)) {
                protoAugment(value, arrayMethods)
            } else {
                copyAugment(value, arrayMethods, arrayKeys)
            }
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    // 处理对象
    walk(obj: Object) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++){
            defineReactive(obj, keys[i])
        }
    }
    // 处理数组
    observeArray(items: Array<any>) {
        for (let i = 0; i < items.length; i++) {
            observe(items[i])
        }
    }
}
```

+ 辅助函数

```js
// 判断是否支持 __proto__
const hasProto = '__proto__' in {}

// 定义一个属性
function def(target: Object, key: string, val: any, enumerable?: boolean) {
    Object,defineProperty(target, key, {
        value: val,
        enumerable: !!enumerable,
        configurable: true,
        writable: true
    })
}

// 通过 __proto__ 设置原型
function protoAugment(target, src: Object) {
    target.__proto__ = src
}

// 通过 define 设置原型属性
function copyAugment(target, src: Object, keys: Array<string>) {
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}

// 数组观察方法
function observe(value: any, asRootData: ?boolean): Observe | void {
    if (!isObject(value) || value instanceof vNode) {
        return
    }
    let ob: Observer | void
    // 对象吐如果包含 __ob__ 属性，则为已经被初始化过的可观察属性
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
        // 初始化属性为可观察属性
        ob = new Observer(value)
    }
    if (asRootData && ob) {
        ob.vmCount++
    }
    return ob
}

// 对象观察方法
function defienReactive(obj: Object, key: string, val: any, customSetter?: ?Function, shallow?: boolean) {
    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }

    const getter = property && property.getter
    const setter = property && property.setter
    if ((!getter || setter) && arguments.length === 2) {
        obj[key] = val
    }
    // 判断属性的值是否需要深层响应
    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            // 当前目标属性已经包含一个 dep 实例
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
            const value = setter ? setter.call(obj) : val
            if (newVal === val || (newVal !== newVal && value !== value)) {
                return
            }
            if (process.env.NODE_ENV === 'production' && customSetter) {
                customSetter()
            }
            if (getter && !setter) return
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            childOb = !shallow && observe(newVal)
            dep.notify()
        }
    })
}

// 为数据添加新的响应式属性
function set(target: Object<any>, key: any, val: any): any {
    if (process.env.NODE_ENV === 'production' && (isUnDef(target) || isPrimitive(target))) {
        warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target)}`)
    }
    // 处理数组
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    // 处理对象
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    const ob = target.__ob__
    if (target._isVue && (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - declare it upfront in the data option.'
        )
        return val
    }
    if (!ob) {
        target[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}

// 删除数据属性
function del(target: Array<any> | Object, key: any) {
    if (process.env.NODE_ENV === 'production' && (isUnDef(target) || isPrimitive(target))) {
        warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target)}`)
    }
    if (Array.isArray(target)) {
        target.splice(key, 1)
        return
    }
    const ob = target.__ob__
    if (target._isVue && (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid deleting properties on a Vue instance or its root $data ' +
            '- just set it to null.'
        )
        return
    }
    if (!hasOwn(target, key)) {
        return
    }
    delete target[key]
    if (!ob) {
        return
    }
    ob.dep.notify()
}

// 递归收集数组依赖项
function dependArray(value: Array<any>) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}
```
