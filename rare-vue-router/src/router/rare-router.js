import RouterLink from './router-link'
import RouterView from './router-view'

let Vue

class RareVueRouter {
  constructor(options) {
    this.$options = options

    // 响应式重新触发页面渲染
    // 或者通过 new Vue 实例去实现响应式
    Vue.util.defineReactive(this, 'current', '')

    // 监听路由变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    // 创建路由映射表
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }
  onHashChange() {
    this.current = window.location.hash.slice(1)
  }
}

RareVueRouter.install = function(_Vue) {
  Vue = _Vue

  // 全局混入 router
  Vue.mixin({
    beforeCreate() {
      // 将 $router 挂载在全局
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })

  // 实现 router-link
  Vue.component('router-link', RouterLink)

  // 实现 router-vew
  Vue.component('router-view', RouterView)
}

export default RareVueRouter
