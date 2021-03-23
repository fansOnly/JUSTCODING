// 对于数组的 push pop shift unshift reverse sort splice 等方法，需要单独处理实现响应式 
// arr -> Array.prototype -> Object.prototype -> null
// arr -> 改写方法 -> Array.prototype -> Object.prototype -> null

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

let array_methods = Object.create(Array.prototype)
methodsToPatch.forEach(method => {
    array_methods[method] = function () {
        // 拦截数组方法，重写后实现响应式
        console.log('数组拦截', method)
        for (let i = 0; i < arguments.length; i++) {
            observe(arguments[i]) // this 指向尚不能处理, 在引入 watcher 后解决
        }
        const result = Array.prototype[method].apply(this, arguments)
        return result
    }
})
