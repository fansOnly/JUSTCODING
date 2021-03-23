/**
 * Watcher - 观察者
 * get: 用来进行计算或执行处理函数
 * update: 外部的公共方法，执行内部的 run 方法
 * run: 用来判断内部是同步执行还是异步执行，执行 get 方法
 * cleanupDeps: 清除队列
 */
let watcherid = 0

class Watcher {
    /**
     * @param {Object} vm  Vue 实例
     * @param {String | Function} expOrFn 如果是渲染 Watcher, 传入的就是函数，计算 Watcher 传入的是路径
     */
    constructor(vm, expOrFn) {
        this.vm = vm
        this.getter = expOrFn

        this.id = watcherid++

        this.deps = [] // 依赖项
        this.depIds = {} // Set 结构，保证 id 的唯一性

        // Vue: 判断是否懒加载
        // 默认直接执行
        this.get()
    }

    /**
     * 触发 getter
     */
    get() {
        // 将当前的 watcher 推入全局的 watcher 容器
        pushTarget(this)

        this.getter.call(this.vm, this.vm)

        // 计算完成后，删除当前的 watcher 关联
        popTarget()
    }

    /**
     * 收集依赖项
     */
    addDep(dep) {
        this.deps.push(dep)
    }

    /**
     * 判断是懒加载、同步执行还是异步执行
     * Vue 中通过调用 queueWatcher, 触发 nextTick 进行异步执行
     */
    update() {
        this.run()
    }

    run() {
        this.get()
    }

    clearupDeps() {}
}
