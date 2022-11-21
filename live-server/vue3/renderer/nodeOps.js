import { patchProp } from "./patchProp";

const doc = typeof document !== 'undefined' ? document : null

export const nodeOps = {
  insert(child, parent, anchor = null) {
    parent.insertBefore(child, anchor)
  },
  remove(child) {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  createElement(tag) {
    return doc.createElement(tag)
  },
  createText(text) {
    return doc.createTextNode(text)
  },
  createComment(text) {
    return doc.createComment(text)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  setText(node, text) {
    node.nodeValue = text
  },
  patchProp
}
