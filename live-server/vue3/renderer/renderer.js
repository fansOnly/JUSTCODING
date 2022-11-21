import { isArray, isObject, isString } from "../utils"
import { Comment, Fragment, isSameVNodeType, Text, Static } from './vnode'

export function createRenderer(options) {
  const {
    insert,
    remove,
    createElement,
    createText,
    createComment,
    setElementText,
    setText,
    patchProp
  } = options

  const patch = (n1, n2, container, anchor) => {
    if (n1 === n2) return
    if (n1 && !isSameVNodeType(n1, n2)) {
      unmount(n1)
      n1 = null
    }
    const { type } = n2
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor)
        break
      case Comment:
        processCommentNode(n1, n2, container, anchor)
        break
      case Fragment:
        processFragment(n1, n2, container, anchor)
        break
      case Static:
        break
      default:
        if (isString(type)) {
          processElement(n1, n2, container, anchor)
        } else {
          processComponent(n1, n2, container, anchor)
        }
    }
  }

  const processText = (n1, n2, container, anchor) => {
    if (n1 === null) {
      // add
      insert((n2.el = createText(n2.children)), n2.children, anchor)
    } else {
      // patch
      const el = n2.el = n1.el
      if (n2.children !== n1.children) {
        setText(n2.children)
      }
    }
  }

  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 === null) {
      // add
      insert((n2.el = createComment(n2.children)), n2.children, anchor)
    } else {
      // there's no support for dynamic comments
      n2.el = n1.el
    }
  }

  const processFragment = (n1, n2, container, anchor) => {
    if (n1 === null) {
      // add
      // a fragment can only have array children
      mountChildren(n2.children, container, anchor)
    } else {
      // patch
    }
  }

  const processElement = (n1, n2, container, anchor) => {
    if (n1 === null) {
      // add
      mountElement(n2, container, anchor)
    } else {
      // patch
      patchElement(n1, n2)
    }
  }

  const processComponent = (n1, n2, container, anchor) => {
    if (n1 === null) {
      // add
      mountComponent(n1, n2, container, anchor)
    } else {
      // patch
      updateComponent(n1, n2)
    }
  }

  const patchChildren = (n1, n2, container, anchor) => {
    const c1 = n1 && n1.children
    const c2 = n2.children

    if (isArray(c2)) {
      if (isArray(c1)) {
        // diff
        patchKeyedChildren(c1, c2, container)
      } else {
        if (isString(c1)) {
          setElementText(container, '')
        }
        mountChildren(n2, container, anchor)
      }
    } else if (isString(c2)) {
      if (isArray(c1)) {
        unmountChildren(c1)
      }
      if (c2 !== c1) {
        setElementText(container, c2)
      }
    } else {
      if (isArray(c1)) {
        unmountChildren(c1)
      } else if (isString(c1)) {
        setElementText(container, '')
      }
    }
  }

  const patchUnKeyedChildren = (n1, n2, container) => {}

  /**
   * @param {*} c1 VNode
   * @param {*} c2 VNode
   * @param {*} container 
   */
  const patchKeyedChildren = (c1, c2, container) => {
    let i = 0 // start
    const l2 = c2.length
    let e1 = c1.length - 1 // old end index
    let e2 = l2 - 1 // new end index

    // 1. sync from start
    // (a b) c d
    // (a b) e f
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container)
      } else {
        break
      }
      i++
    }

    // 2. sync from end
    // a (c d)
    // b (c d)
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container)
      } else {
        break
      }
      e1--
      e2--
    }

    // 3. common sequence & mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
    if (i > e1 && i <= e2) {
      const nextPos = e2 + 1
      const anchor = nextPos < l2 ? c2[nextPos].el : null
      while (i <= e2) {
        patch(null, c2[i], container, anchor)
        i++
      }
    }

    // 4. common sequence & unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // c (a b)
    // (a b)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2 && i <= e1) {
      while (i <= e1) {
        unmount(c1[i])
        i++
      }
    }

    // 5. unknown sequence
    // a b [c d e] f g
    // a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    else {
      // e.g. i = 2
      const s1 = i // old starting index
      const s2 = i // new starting index
      
      // 存储新节点剩余元素的索引映射
      // e.g. [{ e: 2 }, { d: 3 }, { c: 4 }, { h: 5 }]
      const keyToNewIndexMap = new Map()
      for (i = s2; i <= e2; i++) {
        keyToNewIndexMap.set(c2[i].key, i)
      }

      let j = 0
      // 新节点剩余需要更新的节点数量
      // e.g. 4
      const toBePatched = e2 - i + 1
      // 存储新节点剩余元素在旧节点中的索引
      const newIndexToOldIndexMap = new Array(toBePatched)
      // e.g. [-1, -1, -1, -1]
      newIndexToOldIndexMap.fill(-1)

      let patched = 0 // 记录已更新的节点数量
      let moved = false // 记录是否需要移动节点
      let maxNewIndexSoFar = 0 // 记录遍历旧节点过程中遇到的最大索引

      // 开启一个 for 循环，遍历旧节点剩余的元素
      // e.g. [c d e]
      for (i = s1; i <= e1; i++) {
        const n1 = c2[i]
        // 如果全部新节点都已经更新完，剩余的旧节点直接卸载
        if (patched >= toBePatched) {
          unmount(n1)
          continue
        }
        let newIndex
        if (n1.key !== null) {
          // e.g. 4, 3, 2
          newIndex = keyToNewIndexMap.get(n1.key)
        } else {
          // 未绑定 key 的节点，尝试寻找相同节点类型的节点
          // TODO
        }
        if (newIndex === undefined) {
          // 新节点不存在当前旧节点元素
          unmount(n1)
        } else {
          // 更新当前节点索引位置
          // e.g. [2, 1, 0, -1]
          newIndexToOldIndexMap[newIndex - s2] = i
          if (newIndex >= maxNewIndexSoFar) {
            // e.g. 0, 4
            maxNewIndexSoFar = newIndex
          } else {
            // 当前节点需要移动
            // e.g. newIndex = 3, 2
            moved = true
          }
          patch(n1, c2[newIndex], container)
          patched++
        }
      }

      // move & mount
      // e.g. [3]
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : []
      j = increasingNewIndexSequence.length - 1
      // i: e.g. 3, 2, 1, 0
      for (i = toBePatched - 1; i >= 0; i--) {
        // e.g. 5, 4, 3, 2
        const nextPos = s2 + i
        // e.g. h, c, d, e
        const newVnode = c2[nextPos]
        const anchor = nextPos < l2 ? c2[nextPos].el : null
        if (newIndexToOldIndexMap[i] == -1) {
          // mount
          // e.g. i = 3
          patch(null, newVnode, container, anchor)
        } else if (moved) {
          // e.g. [c d e] vs [e d c h]
          // i = 2, j = 3, e !== h, j--
          // i = 2, j = 2, e !== c, j--
          // i = 2, j = 1, e !== d, j--
          // i = 2, j = 0, e === e, move
          // i = 1, j = 0, e !== d, j--
          // i = i, j = -1, move
          // i = 0, j = -1, move
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            insert(newVnode.el, container, anchor)
          } else {
            j--
          }
        }
      }
    }
  }

  const patchElement = (n1, n2) => {
    const el = n2.el = n1.el
    const oldProps = n1.props
    const newProps = n2.props
    
    for (const key in newProps) {
      patchProp(el, key, oldProps[key], newProps[key])
    }

    for (const key in oldProps) {
      if (!(ket in newProps)) {
        patchProp(el, key, oldProps[key], null)
      }
    }

    patchChildren(n1, n2, el)
  }

  const mountElement = (vnode, container, anchor) => {
    const el = vnode.el = createElement(vnode.type)

    if (isString(vnode.children)) {
      setElementText(el, vnode.children)
    } else if (isArray(vnode.children)) {
      mountChildren(vnode.children, el)
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        patchProp(el, key, null, vnode.props[key])
      }
    }

    insert(el, container, anchor)
  }

  const mountComponent = (n1, n2, container, anchor) => {}

  const updateComponent = (n1, n2) => {}

  const patchProps = (n1, n2) => {
    
  }

  const mountChildren = (children, container, anchor) => {
    children.forEach(c => patch(null, c, container, anchor))
  }

  const unmountChildren = (children)  => {
    children.forEach(c => unmount(c))
  }

  const unmount = (vnode) => {
    if (vnode.type === Fragment) {
      unmountChildren(vnode.children)
    }
    remove(vnode.el)
  }

  const render = (vnode, container) => {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
    container._vnode = vnode
  }

  return {
    render
  }
}

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
