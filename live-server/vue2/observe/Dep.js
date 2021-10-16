let uid = 0

export default class Dep {
  constructor() {
    this.id = uid++
    // 存储订阅者 - Watcher 实例
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    const index = this.subs.indexOf(sub)
    if (index > -1) {
      this.subs.splice(index, 1)
    }
  }

  /**
   * 收集依赖
   */
  depend() {
    // 当前的 watcher 位置
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  /**
   * 通知更新
   */
  notify() {
    const subs = this.subs.slice()
    for (let i = 0, len = subs.length; i < len; i++) {
      subs[i].update()
    }
  }
}

// 全局的 watcher 指针
Dep.target = null
var targetStack = []

export function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
