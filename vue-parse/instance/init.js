import { initProxy } from './proxy.js'
import { initState } from './state.js'
import { initEvents } from './events.js'
import { initRender } from './render.js'
import { initLifecycle, callHook } from './lifecycle.js'
import { initInjections, initProvide } from './inject.js'

let uid = 0

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this
        vm.uid = uid++
        vm._isVue = true
        vm.$options = options || {}

        initProxy(vm)

        vm._self = vm
        // 1 初始化生命周期
        // 2 初始化事件
        // 3 初始化渲染函数
        // 4 调用beforeCreate钩子
        // 5 初始化 Injections
        // 6 初始化状态 State
        // 7 初始化 Provides
        // 8 初始化Created钩子
        initLifecycle(vm)
        initEvents(vm)
        initRender(vm)
        callHook('beforeCreate')
        initInjections(vm)
        initState(vm)
        initProvide(vm)
        callHook('created')
        // if (vm.$options.el) {
        //     vm.$mount(vm.$options.el)
        // }
    }
}
