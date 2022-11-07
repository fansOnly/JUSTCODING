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
