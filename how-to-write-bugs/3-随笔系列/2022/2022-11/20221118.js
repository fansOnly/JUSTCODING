

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
        c = ((u + v) / 2) | 0
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


function patchKeyedChildren(n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let j = 0
  let oldVnode = oldChildren[j]
  let newVnode = newChildren[j]

  // 相同的前置元素
  while (oldVnode.key === newVnode.key) {
    patch(oldVnode, newVnode, container)
    oldVnode = oldChildren[++j]
    newVnode = newChildren[++j]
  }

  let oldEnd = oldChildren.length - 1
  let newEnd = newChildren.length - 1
  oldVnode = oldChildren[oldEnd]
  newVnode = newChildren[newEnd]
  // 相同的后置元素
  while (oldVnode.key === newVnode.key) {
    patch(oldVnode, newVnode, container)
    oldVnode = oldChildren[--oldEnd]
    newVnode = newChildren[--newEnd]
  }

  // 剩余元素
  if (j > oldEnd && j <= newEnd) {
    // 旧节点遍历结束，新节点剩余
    const anchorIndex = oldEnd + 1
    const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor)
    }
  } else if (j > newEnd && j <= oldEnd) {
    // 新节点遍历结束，旧节点剩余
    while (j <= oldEnd) {
      unmount(oldChildren[j++])
    }
  } else {
    // 创建一个 source 数组，存储新节点剩余节点在旧节点中的索引
    // 剩余需要处理的元素数量
    let count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)

    let oldStart = j
    let newStart = j
    // 是否有需要移动的节点
    let moved = false
    // 记录遍历旧节点过程中的最大索引值
    let pos = 0

    // 创建索引表，存储新节点剩余元素的索引位置
    let keyIndex = {}
    for (let i = newStart; i <= newEnd; i++) {
      keyIndex[newChildren[i].key] = i
    }

    // 记录已更新的节点数量
    let patched = 0

    for (let i = oldStart; i < oldEnd; i++) {
      oldVnode = oldChildren[i]
      if (patched <= count) {
        const k = keyIndex[oldVnode.key]

        if (typeof k !== 'undefined') {
          newVnode = newChildren[k]
          patch(oldVnode, newVnode, container)
          patched++
          delete keyIndex[newVnode.key]
          // 更新 source 数组
          source[k - newStart] = i
          if (k < pos) {
            moved = true
          } else {
            pos = k
          }
        } else {
          unmount(oldChildren[i])
        }
      } else {
        unmount(oldChildren[i])
      }
    }

    if (moved || Object.keys(keyIndex).length) {
      const seq = getSequence(source)
      let s = seq.length - 1
      let i = count - 1

      for(i; i >= 0; i--) {
        if (source[i] === -1) {
          // 挂载
          const pos = i + newStart
          newVnode = newChildren[pos]
          const nextPos = pos + 1
          const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
          patch(null, newVnode, container, anchor)
        } else if (source[i] !== s) {
          // 移动
          const pos = i + newStart
          newVnode = newChildren[pos]
          const nextPos = pos + 1
          const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
          insert(newVnode.el, container, anchor)
        } else {
          s--
        }
      }
    }
  }
}
