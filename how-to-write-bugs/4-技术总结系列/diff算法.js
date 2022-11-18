/**
 * Vue diff 算法
 * 1. 对比新旧节点，判断是否同一个节点 - patch 函数
 * 2. 如果是同一节点，判断文本节点或者是否包含子节点 - patchVnode 函数
 * 3. 如果都包含子节点，通过双指针方式进行对比更新 - updateChildren 函数
 */
 function patch(oldVode, newVnode) {
  // 判断旧节点是不是虚拟节点，如果不是虚拟节点，转换为虚拟节点
  if (oldVode.sel === '' || oldVode.sel === undefined) {
    oldVode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 判断是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    pathcVnode(oldVnode, newVnode)
  } else {
    // 不是同一节点，将新节点插入旧节点之前，删除旧节点
    let newVnodeElm = createElement(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}

function patchVnode(oldVnode, newVnode) {
  if (oldVnode === newVnode) return
  // 判断新节点是否文本节点, 且没有子节点
  if (newVnode.text !== undefined && (newVnode.children === undefined && newVnode.children.length === 0)) {
    // 如果是文本节点，只替换文本
    if (oldVode.text !== newVnode.text) {
      oldVode.elm.innerText = newVnode.text
    }
  } else {
    // 不是文本节点，拥有子节点
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 旧节点同样拥有子节点，判断子节点是否相同
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 旧节点没有子节点，清空旧节点，遍历添加子节点
      oldVnode.elm.innerHtml = ''
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i])
        oldVnode.elm.appendChild(dom)
      }
    }
  }
}

function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0 // 旧开始指针
  let oldEndIdx = 0 // 旧结束指针
  let newStartIdx = 0 // 新开始指针
  let newEndIdx = 0 // 新结束指针
  let oldStartVnode = oldCh[0] // 旧开始节点
  let oldEndVnode = oldCh[oldCh.length - 1] // 旧结束节点
  let newStartVnode = newCh[0] // 新开始节点
  let newEndVnode = newCh[newCh.length - 1] // 新结束节点

  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode === undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode === undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 新旧开始节点相同
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 新旧结束节点相同
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 旧节点开始和新节点结束相同 - 节点右移
      patchVnode(oldStartVnode, newEndVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 旧节点结束和新节点开始相同 - 节点左移
      pathcVnode(oldEndVnode, newStartVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // .处理其他情况
      let idxInOld // 旧的节点 key
      if (idxInOld === undefined) {
        // 如果新节点的 key 值不存在，直接创建
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else {
        const vnodeToMove = oldCh[idxInOld] // 旧节点中存在 key 值对应的节点
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode)
          oldCh[idxInOld] = undefined
          parentElm.insertBefore(vnodeToMove.elm, oldStartVnode.elm)
        } else { // 同一节点，key 值不同
          parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
        }
      }
      newStartVnode = newCh[++newStartIdx] // 只移动新节点的指针
    }
  }

  // 循环结束，处理未处理的项
  if (oldStartIdx > oldEndIdx) {
    // 旧节点已经遍历完成，新节点可能遍历完成
    // 此时 newStartIdx 和 newEndIdx 之间的节点都是新增的，需要插入到旧的子节点末尾
    let refElm = newCh[newEndIdx + 1] === undefined ? null : newCh[newEndIdx + 1]
    for (let i = newStartIdx; i < newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm, refElm)
    }
  } else if (newStartIdx > newEndIdx) {
    // 旧节点遍历完成
    // 此时 oldStartIdx 和 oldEndIdx 之间的节点都是多余的，需要删除
    for (let i = oldStartIdx; i < oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm)
    }
  }
}
