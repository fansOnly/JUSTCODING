import Compile from "./compile.js"
import { observe } from '../observe/observe.js'
import Watcher from '../observe/Watcher.js'

export default class Vue {
  constructor(options) {
    this.$options = options || {}
    this._data = options.data || undefined
    // 绑定响应式
    observe(this._data)

    this._initData()
    this._initComputed()
    this._initWatch()

    new Compile(options.el, this)
  }

  _initData() {
    Object.keys(this._data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key]
        },
        set(newVal) {
          this._data[key] = newVal
        }
      })
    })
  }

  _initComputed() {}

  _initWatch() {
    const watch = this.$options.watch
    Object.keys(watch).forEach(key => {
      new Watcher(this, key, watch[key])
    })
  }
}

window.Vue = Vue
