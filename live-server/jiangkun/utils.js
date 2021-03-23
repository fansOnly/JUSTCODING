/**
 * makeMap
 */
const tags = 'htlm,div,p,span,ul,li,a,input,select,options,radio,checkbox'

const makeMap = tags => {
    let map = Object.create(null)
    tags.split(',').forEach(key => map[key] = true)
    return function(key) {
        return !!map[key]
    }
}

// 内置标签
const isHTMLTag = makeMap(tags)

console.log(isHTMLTag('span'))


/**
 * 扩展函数的功能 - 函数拦截
 * 1. 用一个临时变量存储该函数
 * 2. 将该函数重新赋值
 * 3. 定义扩展的功能
 * 4. 调用临时变量执行函数
 */

// 对于数组的 push pop shift unshift reverse sort splice 等方法，需要单独处理实现响应式 
// arr -> Array.prototype -> Object.prototype -> null
// arr -> 改写方法 -> Array.prototype -> Object.prototype -> null
const methodsToPatch = [
    'push',
    // 'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

let array_methods = Object.create(Array.prototype)
methodsToPatch.forEach(method => {
    array_methods[method] = function() {
        // 将数据响应式化
        for (let i = 0; i < arguments.length; i++) {
            reactify(arguments[i])
        }
        const result = Array.prototype[method].apply(this, arguments)
        return result
    }
})

// 通过闭包实现中间变量
function defineReactive(target, key, value, enumerable) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        reactify(value)
    }
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get() {
            return value
        },
        set(newVal) {
            value = newVal
            reactify(value)
        }
    })
}

// 响应式化深度嵌套的对象
function reactify(target) {
    const keys = Object.keys(o)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let value = target[key]
        // 引用类型 - 递归响应式
        // 数组 - 循环数组，对元素执行响应式化
        // 基本类型 - 直接响应式
        if (Array.isArray(value)) { // 数组
            value.__proto__ = array_methods
            for (let j = 0; j < value.length; j++) {
                reactify(value[j])
            }
        } else { // 对象，基本类型
            defineReactive(o, keys[i], o[keys[i]], true)
        }
    }
}
