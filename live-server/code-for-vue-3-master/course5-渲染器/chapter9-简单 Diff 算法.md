#### 九、简单 Diff 算法

-----

##### 9.1 减少 DOM 操作的性能和开销

1. 对比新旧两组子节点，遍历长度较短的那个，更多的调用 patch 更新
2. 如果新子节点较长，说明有新节点需要挂载，否则有旧子节点需要卸载

    ```js
    function patchChildren(n1, n2, container) {
      if (typeof n2.children === 'string') {
        // ...
      } else if (Array.isArray(n2.children)) {
        const oldChildren = n1.children
        const newChildren = n2.children
        const oldLen = oldChildren.length
        const newLen = newChildren.length
        const commonLength = Math.min(oldLen, newLen)
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i], container)
        }
        if (newLen > commonLength) {
          for (let i = commonLength; i < newLen ;i++) {
            patch(null, newChildren[i], container)
          }
        } else if (oldLen > commonLength) {
          for (let i = commonLength; i < oldLen; i++) {
            unmount(oldChildren[i])
          }
        }
      } else {
        // ...
      }
    }
    ```

> 示例代码详见 3-code1.html

-----

##### 9.2 DOM 的复用与 key 的作用

1. 如何从更新 DOM 变成移动 DOM
2. 通过 key 值标识新旧 DOM 的对应关系
3. vnode.type 和 key 值相同的 DOM 可以复用

    ```js
    function patchChildren(n1, n2, container) {
      if (typeof n2.children === 'string') {
        // ...
      } else if (Array.isArray(n2.children)) {
        if (Array.isArray(n1.children)) {
          const oldChildren = n1.children
          const newChildren = n2.children
          for (let i = 0; i < newChildren.length; i++) {
            const newVnode = newChildren[i]
            for (let j = 0; j < oldChildren.length; j++) {
              const oldVnode = oldChildren[j]
              if (newVnode.key === oldVnode.key) {
                // 当前节点可以复用
                patch(oldVnode, newVnode, container)
                break
              }
            }
          }
        } else {
          // ...
        }
      } else {
        // ...
      }
    }
    ```

> 示例代码详见 3-code2.html

-----

##### 9.3 找到需要移动的元素

1. 以新子节点的第一个节点开始，寻找其在旧的一组子节点中具有相同 key 值的节点，遇到的最大索引值当作新的起始索引，后续查找的过程中，如果存在比最大索引值小的节点，则该节点需要移动

    ```js
    function patchChildren(n1, n2, container) {
      if (typeof n2.children === 'string') {
        // ...
      } else if (Array.isArray(n2.children)) {
        if (Array.isArray(n1.children)) {
          const oldVnode = n1.children
          const newVnode = n2.children
          // 存储查找过程中的最大索引值
          let lastIndex = 0
          for (let i = 0; i < newChildren.length; i++) {
            const newVnode = newChildren[i]
            for (let j = 0; j < oldChildren.length; j++) {
              const oldVnode = oldChildren[i]
              if (newVnode.key === oldVnode.key) {
                patch(oldVnode, newVnode, container)
                if (lastIndex > j) {
                  // 节点需要移动
                } else {
                  // 更新最大索引的值
                  lastIndex = j
                }
                break
              }
            }
          }
        } else {
          // ...
        }
      } else {
        // ...
      }
    }
    ```

-----
##### 9.4 如何移动元素

1. 通过 vnode.el 找到真实 DOM 的引用
2. 逐个对比新旧节点的位置

    ```js
    // 旧节点  p-1 >> p-2 >> p-3
    // 新节点  p-3 >> p-1 >> p-2

    // step 1. 查找 p-3：p-1 >> p-2 >> p-3
    // step 2. 查找 p-1: p-2 >> p-3 >> p-1
    // step 3. 查找 p-2：p-3 >> p-1 >> p-2
    
    function patchChildren(n1, n2, container) {
      if (typeof n2.children === 'string') {
        // ...
      } else if (Array.isArray(n2.children)) {
        if (Array.isArray(n1.children)) {
          const oldVnode = n1.children
          const newVnode = n2.children
          // 存储查找过程中的最大索引值
          let lastIndex = 0
          for (let i = 0; i < newChildren.length; i++) {
            const newVnode = newChildren[i]
            for (let j = 0; j < oldChildren.length; j++) {
              const oldVnode = oldChildren[i]
              if (newVnode.key === oldVnode.key) {
                patch(oldVnode, newVnode, container)
                if (lastIndex > j) {
                  // 节点需要移动
                  const prevVnode = newChildren[i - 1]
                  // 不存在上一级节点说明当前节点是第一个节点
                  if (prevVnode) {
                    // 获取上一节点对应真实 DOM 的下一个兄弟节点作为锚点元素
                    const anchor = preVnode.el.nextSibling
                    // 将当前 newVnode 对应的真实 DOM 插入到锚点元素之前
                    insert(newVnode.el, container, anchor)
                  }
                } else {
                  // 更新最大索引的值
                  lastIndex = j
                }
                break
              }
            }
          }
        } else {
          // ...
        }
      } else {
        // ...
      }
    }
    ```

> 示例代码详见 3-code3-4.html

-----

##### 9.5 添加元素
