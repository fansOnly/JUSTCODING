import { isProxy } from "../reactivity/index.js"
import { extend, isArray, isObject, isString, normalizeClass, normalizeStyle } from "../utils/index.js"

export const Text = Symbol('Text')
export const Comment = Symbol('Comment')
export const Fragment = Symbol('Fragment')
export const Static = Symbol('Static')

export function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key
}

function createBaseVNode(type, props, children, patchFlag = 0) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: '',
    children,
    component: null,
    el: null,
    anchor: null,
    patchFlag,
    appContext: null
  }

  return vnode
}

const normalizeKey = ({ key }) => key !== null ? key : null

export function isVNode(value) {
  return value ? value.__v_isVNode === true : false
}

export function guardReactiveProps(props) {
  if (!props) return null
  return isProxy(props) ? extend({}, props) : props
}

export function createVNode(type, props, children, patchFlag = 0) {
  if (isVNode(type)) {
    // e.g. <component :is="vnode"/>
  }

  // class & style normalization
  if (props) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    props = guardReactiveProps(props)
    let { class: klass, style } = props
    if (klass && isString(klass)) {
      props.class = normalizeClass(klass)
    }
    if (isObject(style)) {
      // reactive state objects need to be cloned since they are likely to be mutation
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style)
      }
      props.style = normalizeStyle(style)
    }
  }

  return createBaseVNode(type, props, children, patchFlag)
}

export function cloneVNode(vnode) {
  const { props, children, patchFlag } = vnode
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props,
    key: props && normalizeKey(props),
    ref: vnode.ref,
    children,
    patchFlag,
    component: vnode.component,
    el: vnode.el,
    anchor: vnode.anchor
  }

  return cloned
}
