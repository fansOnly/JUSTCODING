#### 十一、快速 Diff 算法

-----

##### 11.1 相同的前置元素和后置元素

1. 预处理步骤：对于相同的前置节点和后置节点，由于它们在新旧两组子节点中的相对位置不变，在更新的过程中无须移动，打补丁即可。

2. 处理完前置和后置元素后，如果新的一组子节点还有元素剩余，需要新增。如果旧的一组子节点还有剩余元素，需要删除

    ```js
    // p-1 p-2 p-3
    // p-1 p-4 p-2 p-3

    function patchKeyedChildren(n1, n2, container) {
      const oldChildren = n1.children
      const newChildren = n2.children
      // 记录卡新旧两组节点的开始
      let j = 0
      let oldVnode = oldChildren[j]
      let newVnode = newChildren[j]
      while (oldVnode.key === newVnode.key) {
        // 相同的前置节点 (p-1)
        patch(oldVnode, newVnode, container)
        j++
        oldVnode = oldChildren[j]
        newVnode = newChildren[j]
      }
      let oldEnd = oldChildren.length - 1
      let newEnd = newChildren.length - 1

      oldVnode = oldChildren[oldEnd]
      newVnode = newChildren[newEnd]
      while (oldVnode.key === newVnode.key) {
        // 处理相同的后置节点 (p-2 p-3)
        patch(oldVnode, newVnode, container)
        oldEnd--
        newEnd--
        oldVnode = oldChildren[oldEnd]
        newVnode = newChildren[newEnd]
      }

      // 剩余元素处理
      if (j > oldEnd && j <= newEnd) {
        // 新节点剩余元素，需要挂载
        const anchorIndex = newEnd + 1
        // 判断剩余元素的挂载位置
        const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
        while (j <= newEnd) {
          patch(null, newChildren[j++], container, anchor)
        }
      } else if (j > newEnd && j <= oldEnd) {
        // 旧节点剩余的元素
        while (j <= oldEnd) {
          unmount(oldChildren[j++])
        }
      }
    }
    ```

> 示例代码详见 5-code11-1.html

-----

##### 11.2 判断是否需要进行 DOM 移动

1. 对于需要移动的元素，首先构造一个数组 source，用来存储新的一组子节点中剩余未处理的元素在旧节点中的索引，并根据它计算出一个最长递增子序列

|source|new vnode| old vnode| |source|new vnode|old vnode|
|-|-|-|-|-|-|-|
|null|p-1|p-1| |null|p-1|p-1| |
|-1|p-3|p-2| |2|p-3|p-2| |
|-1|p-4|p-3| |3|p-4|p-3| |
|-1|p-2|p-4| |1|p-2|p-4| |
|-1|p-7|p-6| |-1|p-7|p-6| |
|null|p-5|p-5| |null|p-5|p-5| |

2. 如何填充 source 数组

    ```js
    // 双层 for 循环，时间复杂度 O(n^2)
    function patchKeyedChildren(n1, n2, container) {
      // ...
      if (j > oldEnd && j <= newEnd) {
        // ...
      } else if (j > newEnd && j <= oldEnd) {
        // ...
      } else {
        // 创建 source 数组
        const count = newEnd - j + 1
        const source = new Array(count)
        source.fill(-1)
        // 定义起始索引
        const oldStart = j
        const newStart = j
        for (let i = oldStart; i <= oldEnd; i++) {
          oldVnode = oldChildren[i]
          for (let k = newStart; k <= newEnd; k++) {
            newVnode = newChildren[k]
            if (oldVnode.key === newVnode.key) {
              patch(oldVnode, newVnode, container)
              // 更新 source 数组
              source[k - newStart] = i
            }
          }
        }
      }
    }
    // 索引表，时间复杂度 O(n)
    function patchKeyedChildren(n1, n2, container) {
      // ...
      if (j > oldEnd && j <= newEnd) {
        // ...
      } else if (j > newEnd && j <= oldEnd) {
        // ...
      } else {
        const count = newEnd - j + 1
        const source = new Array(count)
        source.fill(-1)
        const oldStart = j
        const newStart = j
        // 构建索引表
        const keyIndex = {}
        for (let i = newStart; i <= newEnd; i++) {
          keyIndex[newChildren[i].key] = i
        }
        // 遍历旧节点
        for (let i = oldStart; i <= oldEnd; i++) {
          oldVnode = oldChildren[i]
          const k = keyIndex[oldVnode.key]

          if (typeof k !== 'undefined') {
            newVnode = newChildren[k]
            patch(oldVnode, newVnode, container)
            source[k - newStart] = i
          } else {
            // 未找到，需要卸载
            unmount(oldVnode)
          }
        }
      }
    }
    ```

3. 如何移动节点
    - 新增变量 moved 和 pos 记录是否需要移动

    ```js
    function patchKeyedChildren(n1, n2, container) {
      // ...
      if (j > oldEnd && j <= newEnd) {
        // add
      } else if (j > newEnd && j <= oldEnd) {
        // unmount
      } else {
        const count = newENd - j + 1
        const source = new Array(count)
        source.fill(-1)

        const oldStart = j
        const newStart = j
        // 是否需要移动
        let moved = false
        // 记录遍历旧节点过程中遇到的最大索引值
        let pos = 0
        
        const keyIndex = {}
        for (let i = newStart; i <= newEnd; i++) {
          keyIndex[newChildren[i].key] = i
        }
        for (let i = oldStart; i <= oldEnd; i++) {
          oldVnode = oldChildren[i]
          const k = keyIndex[oldVnode.key]

          if (typeof k !== 'undefined') {
            // 需要移动的节点
            newVnode = newChildren[k]
            patch(oldVnode, newVnode, container)
            source[k - newStart] = i
            if (k < pos) {
              moved = true
            } else {
              pos = k
            }
          } else {
            unmount(oldVnode)
          }
        }
      }
    }
    ```

4. 新增变量 patched 记录已更新的节点，如果已更新的节点数量达到 source 数组的长度，剩下的节点都需要卸载

      ```js
      function patchKeyedChildren(n1, n2, container) {
        // ...
        if (j > oldEnd && j <= newEnd) {
          // add
        } else if (j > newEnd && j <= oldEnd) {
          // unmount
        } else {
          const count = newEnd - j + 1
          const source = new Array(count)
          source.fill(-1)

          const oldStart = j
          const newStart = j
          let moved = false
          let pos = 0

          const keyIndex = {}
          for (let i = newStart; i <= newEnd; i++) {
            keyIndex[newChildren[i].key] = i
          }
          let patched = 0
          for (let i = oldStart; i <= oldEnd; i++) {
            oldVnode = oldChildren[i]
            if (patched <= count) {
              const k = keyIndex[oldVnode.key]

              if (typeof k 1== 'undefined') {
                // 移动节点
                newVnode = newChildren[k]
                patch(oldVnode, newVnode, container)
                patched++
                source[k - newStart] = i
                if (k < pos) {
                  moved = true
                } else {
                  pos = k
                }
              } else {
                unmount(oldVnode)
              }
            } else {
              unmount(oldVnode)
            }
          }
        }
      }
      ```

-----

##### 11.3 如何移动元素

1. 当 moved 为 true 的时候，需要进行移动操作

2. 获取 source 数组的最长递增子序列，子序列中对应索引的元素不需要移动

3. 定义索引 i 指向 source 数组中的最后一个节点，定义索引 s 指向最长递增子序列中的最后一个是元素，开启一个 for 循环，让 i 和 s 递减移动

    ```js
    function patchKeyedChildren(n1, n2, container) {
      // ...
      if (j > oldEnd && j <= newEnd) {
        // add
      } else if (j > newEnd && j <= oldEnd) {
        // unmount
      } else {
        const count = newEnd - j + 1
        const source = new Array(count)
        source.fill(-1)

        const oldStart = j
        const newStart = j
        let moved = false
        let pos = 0

        const keyIndex = {}
        for (let i = newStart; i <= newEnd; i++) {
          keyIndex[newChildren[i].key] = i
        }

        let patched = 0
        for (let i = oldStart; i <= oldEnd; i++) {
          oldVnode = oldChildren[i]
          if (patched <= count) {
            const k = keyIndex[oldVnode.key]
            if (typeof k 1== 'undefined') {
              // 节点复用
              newVnode = newChildren[k]
              patch(oldVnode, newVnode, container)
              patched++
              source[k - newStart] = i

              if (k < pos) {
                // 需要移动
                moved = true
              } else {
                pos = k
              }
            } else {
              unmount(oldVnode)
            }
          } else {
            unmount(oldVnode)
          }
        }

        if (moved) {
          // 移动节点
          const seq = getSequence(source)

          let s = seq.length - 1
          let i = count - 1
          for (i; i >= 0; i--) {
            if (source[i] === -1) {
              // 需要挂载的节点
              const pos = i + newStart
              const newVnode = newChildren[pos]
              const nextPos = pos + 1
              const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
              patch(null, newVnode, container, anchor)
            } else if (i !== seq[s]) {
              // 需要移动的节点
              const pos = i + newStart
              const newVnode = newChildren[pos]
              const nextPos = pos + 1
              const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
              insert(newVnode.el, container, anchor)
            } else {
              // 不需要移动，更新 s
              s--
            }
          }
        }
      }
    }
    ```

> 示例代码详见 5-code11-2&3.html
