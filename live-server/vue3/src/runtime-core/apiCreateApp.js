import { isFunction, isObject } from '../utils/index.js'
import { cloneVNode, createVNode } from './vnode.js'
import { getExposeProxy } from './component.js'

export function createAppContext() {
  return {
    app: null,
    config: {
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null)
  }
}

let uid = 0

export function createAppAPI(render) {
  /**
   * @param {string | component} rootComponent 根组件
   * @param {object} rootProps 传递给根组件的 props
   */
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = { ...rootComponent }
    }

    if (rootProps !== null && !isObject(rootProps)) {
      console.warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }

    const context = createAppContext()
    const installedPlugins = new Set()

    let isMounted = false

    const app = (context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version: 'v0.0.1',
      get config() {
        return context.config
      },
      set config(v) {
        console.warn(
          `app.config cannot be replaced. Modify individual options instead.`
        )
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          // Plugin has already been applied to target app.
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin)
          plugin.install(app, ...options)
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin)
          plugin(app, ...options)
        } else {
          console.warn(
            `A plugin must either be a function or an object with an "install" ` +
            `function.`
          )
        }
        return app
      },
      mixins(mixin) {
        if (!context.mixins.includes(mixin)) {
          context.mixins.push(mixin)
        } else {
          console.warn('Mixins are only available in builds supporting Options API')
        }
        return app
      },
      component(name, component) {
        if (!component) {
          return context.components[name]
        }
        if (context.components[name]) {
          console.warn(`Component "${name}" has already been registered in target app.`)
        }
        context.components[name] = component
        return app
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name]
        }
        if (context.directives[name]) {
          console.warn(`Directive "${name}" has already been registered in target app.`)
        }
        context.directives[name] = directive
        return app
      },
      mount(rootContainer) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps)
          vnode.appContext = context
          // some sideEffect code, need to delete
          vnode.children = rootComponent.children
          vnode.type = rootComponent.type
          
          // HMR root reload
          context.reload = () => {
            render(cloneVNode(vnode), rootContainer)
          }

          render(vnode, rootContainer)
          isMounted = true
          app._container = rootContainer

          return getExposeProxy(vnode.component) || vnode.component?.proxy
        } else {
          console.warn(
            `App has already been mounted.\n` +
            `If you want to remount the same app, move your app creation logic ` +
            `into a factory function and create fresh app instances for each ` +
            `mount - e.g. \`const createMyApp = () => createApp(App)\``
          )
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container)
        } else {
          console.warn(`Cannot unmount an app that is not mounted.`)
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          console.warn(
            `App already provides property with key "${String(key)}". ` +
            `It will be overwritten with the new value.`
          )
        }
        context.provides[key] = value
        return app
      }
    })

    return app
  }
}
