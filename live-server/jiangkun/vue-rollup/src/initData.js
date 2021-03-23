
// 通过闭包实现中间变量
function defineReactive(target, key, value, enumerable) {
    if (isObject(value)) {
        observe(value)
    }

    const dep = new Dep()
    
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get() {
            console.log('getter', key)
            dep.depend() // 依赖收集
            return value
        },
        set(newVal) {
            console.log('setter', key, newVal)
            if (value === newVal) return
            value = newVal
            // 对于直接赋值的引用类型，变成响应式新值
            // 由于数组不能添加响应式，对数组直接赋值不会触发响应式
            if (isObject(value)) {
                observe(value)
            }
            // Vue：watcher
            dep.notify()
        }
    })
}

// 将对象编变成响应式
function observe(target) {
    if (Array.isArray(target)) {
        target.__proto__ = array_methods
        for (let i = 0; i < target.length; i++) {
            observe(target[i])
            // defineReactive.call(vm, target, i, target[i], true)
        }
    } else {
        const keys = Object.keys(target)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            defineReactive(target, key, target[key], true)
        }
    }
}

/**
 * Vue: 引入 proxy 实现数据的映射: 
 * 将对象属性的访问映射到属性的成员上
 * this.xx -> this.data.xx
 */
function proxy(target, prop, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            return target[prop][key]
        },
        set(newVal) {
            target[prop][key] = newVal
        }
    })
}

MyVue.prototype.initData = function() {
    // 遍历 this._data 的成员，转化为响应式，将其属性代理到实例上
    // 响应式实现
    observe(this._data)
    // 属性访问的代理实现
    const keys = Object.keys(this._data)
    for (let i = 0; i < keys.length; i++) {
        proxy(this, '_data', keys[i])
    }
}
