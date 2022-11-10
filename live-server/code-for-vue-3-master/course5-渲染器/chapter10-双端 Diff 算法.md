#### 十、双端 Diff 算法

-----

##### 10.1 双端比较的原理

1. 同时对新旧两组子节点的两个端点进行比较

2. 需要四个索引值，分别指向新旧两组子节点的端点

3. 双端比较的步骤：
    - 头头比较：比较新旧两组子节点的第一个子节点
    - 尾尾比较：比较新旧两组子节点的最后一个子节点
    - 头尾比较：比较旧子节点的第一个子节点和新子节点的最后一个子节点
    - 尾头比较：比较旧子节点的最后一个子节点和新子节点的第一个子节点

4. 比较分为多轮，放在循环中处理，条件为头部索引值不大于尾部索引值

5. 比较过程中，遇到需要更新的地方，在进行 DOM 移动操作之前，需要调用 patch 函数在新旧节点之间打补丁。移动结束后，更新相应的索引值

6. 更新过程
    - 如果头头相同，patch 打补丁，更新索引
    - 如果尾尾相同，patch 打补丁，更新索引
    - 如果头尾相同，patch 打补丁，移动（insert）旧头部节点对应的真实 DOM 到尾部
    - 如果尾头相同，patch 打补丁，移动（insert）旧尾部节点对应的真实 DOM 到头部

    ```js
    // p-1 p-2 p-3 p-4
    // p-4 p-2 p-1 p-3

    function patchChildren(n1, n2, container) {
      if (typeof n2.children === 'string') {
        // ...
      } else if (Array.isArray(n2.children)) {
        patchKeyedChildren(n1, n2, container)
      } else {
        // ...
      }
    }
    function patchKeyedChildren(n1, n2, container) {
      const oldChildren = n1.children
      const newChildren = n2.children
      // 四个索引
      let oldStartIdx = 0
      let oldEndIdx = oldChildren.length - 1
      let newStartIdx = 0
      let newEndIdx = newChildren.length - 1
      // 四个节点
      let oldStartVnode = oldChildren[oldStartIdx]
      let oldEndVnode = oldChildren[oldEndIdx]
      let newStartVnode = newChildren[newStartIdx]
      let newEndVnode = newChildren[newEndIdx]
      // 四个更新场景
      while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode.key === newStartVnode.key) {
          // 头头相等，patch，更新索引
          patch(oldStartVnode, newStartVnode, container)
          oldStartVnode = oldChildren[++oldStartIdx]
          newStartVnode = newChildren[++newStartIdx]
        } else if (oldEndVnode.key === newEndVnode.key) {
          // 尾尾相同，patch，更新索引
          patch(oldEndVnode, newEndVnode, container)
          oldEndVnode = oldChildren[--oldEndIdx]
          newEndVnode = newChildren[--newEndIdx]
        } else if (oldStartVnode.key === newEndVnode.key) {
          // 头尾相同，patch，insert，更新索引
          patch(oldStartVnode, newEndVnode, container)
          insert(oldStartVnode.el, container, oldEndVnode.el.nextSibling)
          oldStartVnode = oldChildren[++oldStartIdx]
          newEndVnode = newChildren[--newEndIdx]
        } else if (oldEndVnode.key === newStartVnode.key) {
          // 尾头相同，patch，insert，更新索引
          patch(oldEndVnode, newStartVnode, container)
          insert(oldEndVnode.el, container, oldStartVnode.el)
          oldEndVnode = oldChildren[--oldEndIdx]
          newStartVnode = newChildren[++newStartIdx]
        }
      }
    }
    ```

> 示例代码详见 4-code1.html

-----

##### 10.2 双端算法的优势

-----

##### 10.3 非理想状况的处理方式

1. 当不满足四种场景时，尝试非头部、非尾部的节点能否复用

2. 拿新的一组子节点的头部去旧的一组子节点中查找是否可以复用。如果可复用，将旧的一组子节点中对应的真实 DOM 移动到头部，将其原来位置的真实 DOM 设为 undefined，更新索引

3. 上述操作会导致更新过程中，旧的一组子节点中节点值为 undefined 的情况，此时应该直接更新索引，进入下一轮循环

    ```js
    // p-1 p-2 p-3 p-4
    // p-2 p-4 p-1 p-3

    function patchKeyedChildren(n1, n2, container) {
      // ...
      while (oldStartIdx <= oldEndIdx && newStartIDx <= newEndIdx) {
        if (!oldStartVnode) {
          oldStartVnode = oldChildren[++oldStartIdx]
        } else if (!oldEndVnode) {
          oldEndVnode = oldChildren[--oldEndIdx]
        } else if (oldStartVnode.key === newStartVnode.key) {
          //
        } else if (oldEndVnode.key === newEndVnode.key) {
          // 
        } else if (oldStartVnode.key === newEndVnode.key) {
          // 
        } else if (oldEndVnode.key === newStartVnode.key) {
          //
        } else {
          // 在旧子节点中寻找与新节点第一个子节点 key 相同的元素
          const idxInOld = oldChildren.findIndex(v => v.key === newStartVnode.key)
          if (idxInOld > 0) {
            // 找到后，获取该节点
            const nodeToMove = oldChildren[idxInOld]
            // 打补丁
            patch(nodeToMove, newStartVnode, container)
            // 将其所对应的真实 DOM 移动到头部
            insert(nodeToMove.el, container, oldStartVnode.el)
            // 将该元素原有位置的真实 DOM 设为 undefined
            oldChildren[idxInOld] = undefined
            // 更新索引
            newStartVnode = newChildren[++newStartIdx]
          }
        }
      }
    }
    ```

> 示例代码详见 4-code3.html

-----

##### 10.4 添加新元素

1. 如果新的一组子节点的头部节点是新增节点，将其作为新节点挂载到真实 DOM 头部

    ```js
    // p-1 p-2 p-3
    // p-4 p-1 p-3 p-2

    function patchKeyedChildren(n1, n2, container) {
      // ...
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode.key === newStratVnode.key) {
          // ...
        } else if (oldEndVnode.key === newEndVnode.key) {
          // ...
        } else if (oldStartVnode.key === newEndVnode.key) {
          // ...
        } else if (oldEndVnode.key === newStartVnode.key) {
          // ...
        } else {
          const idxInOld = oldChildren.findIndex(v => v.key === newStartVnode.key)
          if (idxInOld > 0) {
            // ...
          } else {
            // 作为新节点挂载到头部
            patch(null, newStartVnode, container, oldStartVnode.el)
          }
        }
      }
    }
    ```

2. 如果循环结束后，新的一组子节点中依然存在剩余的节点，将它们依次挂载到头部

    ```js
    // p-1 p-2 p-3
    // p-4 p-1 p-2 p-3

    function patchKeyedChildren(n1, n2, container) {
      // ...
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // ...
      }
      // 循环结束，处理剩下的节点
      if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
        // 新子节点剩余，需要挂载
        for (let i = newStartIdx; i < newEndIdx; i++) {
          patch(null, newChildren[i], container, oldStartVnode.el)
        }
      }
    }
    ```

> 示例代码详见 4-code4.html

-----

##### 10.5 移除元素

1. 循环结束后，如果旧节点剩余元素，需要移除

    ```js
    // p-1 p-2 p-3
    // p-1 p-3
    function patchKeyedChildren(n1, n2, container) {
      // ...
      while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // ...
      }
      if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
        // 新增元素
      } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
        // 移除元素
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          unmount(oldChildren[i])
        }
      }
    }
    ```

> 示例代码详见 4-code5.html
