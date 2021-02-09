import { queueWatcher } from './scheduler.js'
import { pushTarget, popTarget } from './dep.js'
import { isObject } from '../utils/util.js'

let uid = 0

export default class Watcher {
    constructor(vm, expOrFn, cb, options) {
        this.vm = vm
        if (options) {
            this.dep = !!options.dep
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
            this.before = options.before
        } else {
            this.dep = this.user = this.lazy = this.sync = false
        }
        this.cb = cb
        this.id = ++uid
        this.active = true
        this.dirty = this.lazy
        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.getter = expOrFn

        this.value = this.get()
    }

    /**
     * 评估getter，重新收集依赖
     */
    get() {
        pushTarget(this)
        let value
        const vm = this.vm
        try {
            value = this.getter.call(vm, vm)
        } catch (error) {
            console.log('error', error)
        } finally {
            if (this.deep) {
                // traverse(value)
            }
            popTarget(this)
            this.cleanupDeps()
        }
        return value
    }

    /**
     * 添加依赖
     */
    addDep(dep) {
        const id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    /**
     * 清除依赖收集
     */
    cleanupDeps() {
        let i = this.deps.length
        while (i--) {
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let tmp = this.depIds
        this.depIds  = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    /**
     * 依赖变更时触发订阅
     */
    update() {
        if (this.lazy) {
            this.dirty = true
        } else if (this.sync) {
            this.run()
        } else {
            queueWatcher(this)
        }
    }

    run() {
        if (this.active) {
            const value = this.get()
            if (value !== this.value || isObject(value) || this.deep) {
                const oldValue = this.value
                this.value = value
                this.cb.call(this.vm, value, oldValue)
            }
        }
    }

    evaluate() {
        this.value = this.get()
        this.lazy = false
    }

    /**
     * 触发当前观察者的全部depend
     */
    depend() {
        const i = this.deps.length
        while (i--) {
            this.deps[i].depend()
        }
    }

    /**
     * 移除依赖想的所有订阅
     */
    teardown() {
        if (this.active) {
            const i = this.deps.length
            while (i--) {
                this.deps[i].removeSub(this)
            }
            this.active = false
        }
    }
}
