import { proxyRefs, markRaw } from '../reactivity/index.js'
import { createAppContext } from './apiCreateApp.js'

const emptyAppContext = createAppContext()

let uid = 0

export function createComponentInstance(vnode, parent) {
  const type = vnode.type
  // inherit parent app context - or - if root, adopt from root vnode
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext

  const instance = {
    uid: uid++,
    vnode,
    parent,
    type,
    appContext,
    root: null,
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),

    // local resolved assets
    components: null,
    directives: null,

    // lifecycle hooks
    isMounted: false
  }
  instance.root = parent ? parent.root : instance

  return instance
}

export function getExposeProxy(instance) {
  if (instance?.exposed) {
    return (
      instance.exposeProxy ||
      (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key]
          }
        }
      }))
    )
  }
}
