let uid = 0

class Dep {
    constructor() {
        this.id = uid++
        this.subs = [] // 存储与当前 dep 关联的 watcher
    }

    /**
     * 添加一个指定属性的 watcher
     */
    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        for (let i = this.subs.length - 1; i > 0; i--) {
            if (sub === this.subs[i]) {
                this.subs.splice(i, 1)
            }
        }
    }

    /**
     * 将当前的 dep 与当前的 watcher 互相关联
     */
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target) // 将当前的 watcher 关联到 dep 上
            Dep.target.addDep(this) // 将当前的 dep 关联到 当前的 wacther 上
        }
    }
    
    /**
     * 触发 dep 关联的 watcher, 调用 update 实现更新
     */
    notify() {
        const subs = this.subs.slice()
        for (let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
    }
}

/**
 * 全局的容器
 * 存储当前的 watcher
 * watcher 调用 get 方法的时候，执行 pushTarget(this)
 * 调用结束，执行 popTarget()
 */
Dep.target = null

let targetStack = []

/**
 * 将当前操作的 watcher 存入全局
 */
function pushTarget(target) {
    targetStack.push(target)
    Dep.target = target
}

/**
 * 将当前的 watcher 踢出
 * 最后 Dep.target 就是 undifined
 */
function popTarget() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}
