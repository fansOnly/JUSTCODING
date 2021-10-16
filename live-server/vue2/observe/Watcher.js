import { pushTarget, popTarget } from './Dep.js'
import { parsePath } from './utils.js'

let uid = 0

export default class Watcher {
  constructor(target, expOrFn, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expOrFn)
    this.callback = callback

    this.value = this.get()
  }

  get() {
    // 进入依赖收集
    pushTarget(this)

    const obj = this.target

    var value

    try {
      value = this.getter(obj)
    } finally {
      // 重置 watcher 指针
      popTarget()
    }
    return value
  }

  update() {
    this.run()
  }

  run() {
    const value = this.get()

    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value
      this.value = value
      this.callback.call(this.target, value, oldValue)
    }
  }

  addDep(dep) {
    dep.addSub(this)
  }

  depend() {}
}
