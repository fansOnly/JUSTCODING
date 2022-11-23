import { patchProp } from "./patchProp.js"
import { nodeOps } from './nodeOps.js'
import { extend, isFunction, isString } from "../utils/index.js"
import { createRenderer } from "../runtime-core/index.js"

const rendererOptions = extend({ patchProp }, nodeOps)

let renderer

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}

export const render = (...args) => {
  ensureRenderer().render(...args)
}

export const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args)

  // 兼容 innerHTML 模板
  const { mount } = app
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return

    const component = app._component
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }
    // clear content before mounting
    container.innerHTML = ''
    const proxy = mount(container)
    return proxy
  }

  return app
}

function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container)
    if (!res) {
      console.warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      )
    }
    return res
  }
  return container
}


export * from '../runtime-core/index.js'
