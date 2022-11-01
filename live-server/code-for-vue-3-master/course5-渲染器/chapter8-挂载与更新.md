#### 八、挂载与更新

-----

##### 8.1 挂载子节点和元素的属性

1. 一个元素的字节点会有很多个，需要将 vnode.children 定义为数组

    ```js
    const vnode = {
      type: 'div',
      children: [
        { type: 'p', children: 'hello' }
      ]
    }
    function createRenderer(option) {
      // ...
      function mountElement(vnode, container) {
        const el = createElement(vnode.type)
        if (typeof vnode.children === 'string') {
          setElementText(el, vnode.children)
        } else if (Array.isArray(vnode.children)) {
          vnode.children.forEach(child => {
            // 子节点的第一次是挂载，没有旧节点
            patch(null, child, el)
          })
        }
        insert(el, container)
      }
    }
    ```

2. 描述虚拟 DOM 的属性

    ```js
    const vnode = {
      type: 'div',
      props: {
        id: 'foo'
      },
      children: 'hello'
    }

    function createRenderer(options) {
      // ...
      function mountElement(vnode, container) {
        // ...
        if (vnode.props) {
          for (const key in vnode.props) {
            el.setAttribute(key, vnode.props[key])
            // 或者
            // el[key] = vnode.props[key]
          }
        }
        insert(el, container)
      }
    }
    ```

> 示例代码详见 2-code1.html

-----

##### 8.2 正确的设置元素属性

1. HTML Attributes 的作用是设置与之对应的 DOM Properties 的值
    - 优先设置元素的 DOM Properties，当值为空字符串时，手动矫正为 false
    - 如果属性不存在，通过 HTML Attributes 设置
    - 对于一些只读的属性，特殊处理

2. 将属性设置提取为配置项

> 示例代码详见 2-code2.html

-----

###### 8.3 class 的处理

1. Vue.js 对 class 属性做了增强
    - 指定 class 为一个字符串值
    - 指定 class 为一个对象值
    - 指定 class 为包含两种类型的数组

      ```js
      const vnode = {
        tag: 'div',
        props: {
          class: 'foo bar',
          class: { foo: true, bar: false },
          class: ['foo', { bar: false }]
        },
        children: ''
      }
      ```

2. 设置 class 方式的最优解
    - setAttribute
    - el.className ✅
    - el.classList

> 示例代码详见 2-code3.html

-----

##### 8.4 卸载操作

1. 卸载操作发生在更新阶段，更新指的是初次挂载完成之后，后续渲染会触发更新

2. 卸载时，需要处理以下场景
    - 如果容器的内容是由某个或多个组件渲染的，应该正确的调用这些组件的 beforeUnmount，unmounted 等生命周期函数
    - 如果元素存在自定义指令，应该在卸载前正确执行对应的指令钩子函数
    - 使用 innerHTML 清空元素时，并不会移除绑定在元素身上的事件处理函数

3. 卸载时，应该根据 vnode 对象获取与其关联的真实 DOM 元素，然后使用原生 DOM 操作方法将该 DOM 元素移除

    ```js
    function mountElement(vnode, container) {
      // 让 vnode.el 引用真实 DOM 元素
      const el = vnode.el = createELement(vnode.type)
      // ...
    }

    function unmount(vnode) {
      const parent = vnode.el.parentNode
      if (parent) {
        parent.removeChild(vnode.el)
      }
    }
    ```

> 示例代码详见 2-code4.html

-----

##### 8.5 区分 vnode 的类型

1. 字符串值：普通标签元素
2. 对象值：组件
3. 其他类型

    ```js
    function patch(n1, n2, container) {
      if (n1 && n1.type !== n2.type) {
        unmount(n1)
        n1 = null
      }
      const { type } = n2
      if (typeof type === 'string') {
        mountElement(n2, container)
      } else if (typeof type === 'object') {
        // 组件
      } else {
        // ...
      }
    }
    ```

> 示例代码详见 2-code5.html

-----

##### 8.6 事件的处理

1. 如何区分事件：属性值以 on 开头的属性当作事件

    ```js
    function patchProps(el, key, preValue, nextVale) {
      if (/^on/.tes(key)) {
        const name = key.slice(2).toLowerCase()
        el.addEventListener(name, nextValue)
      }
    }
    ```

2. 事件的更新优化
    - 默认处理方式是先移除旧的事件，在绑定新的事件
    - 优化：伪造一个新的事件处理函数，将其 value 值引用真正的事件，在事件更新的时候，只需要更新其 value 值即可

    ```js
    function patchProps(el, key, preValue, nextValue) {
      if (/^on/.test(key)) {
        const name = key.slice(2).toLowerCase()
        // 移除上一次的事件
        preValue && el.removeEventListener(name, preValue)
        el.addEventListener(name, nextValue)
      }
    }
    // 优化
    function patchProps(el, key, preVal, nextValue) {
      if (/^on/.test(key)) {
        const name = key.slice(2).toLowerCase()
        let invoker = el._vei
        if (nextValue) {
          if (!invoker) {
            invoker = el._vei = (e) => {
              invoker.value(e)
            }
            invoker.value = nextValue
            el.addEventListener(name, invoker)
          } else {
            invoker.value = nextValue
          }
        } else {
          el.removeEventListener(name, invoker)
        }
      }
    }
    ```

3. 元素可能绑定多个事件，将 el._vei设计成对象，键是事件名称，值是事件处理函数

    ```js
    function patchProps(el, key, preValue, nextValue) {
      if (/^on/.test(key)) {
        const name = key.slice(2).toLowerCase()
        const invokers = el._vei || (el._vei = {})
        let invoker = invokers[key]
        // ...
        invoker = el._vei[key] = e => {
          invoker.value(e)
        }
        // ...
      }
    }
    ```

4. 同一个事件可能会添加多次，用数组存储

    ```js
    function patchProps(el, key, preValue, nextValue) {
      // ...
      invoker = el._vei = e => {
        if (Array.isArray(invoker.value)) {
          invoker.value.forEach(fn => fn(e))
        } else {
          invoker.value(e)
        }
      }
    }
    ```

> 示例代码详见 2-code6.html

-----

##### 8.7 事件冒泡与更新时间机制

1. 由子节点点击事件触发的父节点动态绑定事件，不应该在首次渲染完成时触发

2. 父节点动态添加事件的时间（更新操作）处于事件冒泡之前

3. 微任务会穿插在事件冒泡触发的多个事件处理函数之间被执行，把绑定事件的任务放到微任务中也不行

4. 父节点事件的触发事件肯定晚于子节点的事件执行时间，可以根据时间差，屏蔽执行时间晚于事件触发时间的事件执行

5. e.timeStamp 需要是一个高精度设计，注意兼容性处理

    ```js
    function patchProps(el, key, preValue, oldValue) {
      invoker = el._vei[key] = e => {
        if (e.timeStamp < invoker.attached) return
        if (Array.isArray(invoker.value)) {
          invoker.value.forEach(fn => fn(e))
        } else {
          invoker.value(e)
        }
      }
      invoker.value = nextValue
      invoker.attached = performance.now()
      el.addEventListener(name, invoker)
      // ...
    }
    ```

> 示例代码详见 2-code7.html

-----

##### 8.8 更新字节点

1. 元素的字节点类型
    - 没有子节点：null
    - 文本子节点：string
    - 多个子节点：array

2. 新子节点是文本：
    - 旧子节点是空，不做处理
    - 旧字节点是文本，更新内容
    - 旧字节点是一组子节点，将旧子节点逐个卸载，更新内容
3. 新子节点是空：
    - 旧子节点是空，不做处理
    - 旧子节点是文本，清空内容
    - 旧子节点是一组子节点，将旧子节点逐个卸载
4. 新子节点是一组子节点：
    - 旧子节点是空，将新子节点逐个挂载
    - 旧子节点是文本，将文本清空，并将新子节点逐个挂载
    - 旧子节点是一组子节点，差量更新（核心 Diff 算法）

      ```js
      function patchElement(n1, n2) {
        // 将真实 DOM 添加到新的虚拟 DOM 属性上
        const el = n2.el = n1.el
        const oldProps = n1.props
        const newProps = n2.props

        // 遍历新节点的属性，更新对应属性的值
        for (const key in newProps) {
          if (newProps[key] !== oldProps[key]) {
            patchProps(n2, key, oldProps[key], newProps[key])
          }
        }
        // 遍历旧节点的属性，删除多余的
        for (const key in oldProps) {
          if (!(key in newProps)) {
            patchProps(n2, key, oldProps[key], null)
          }
        }

        // 更新子节点
        patchChildren(n1, n2, el)
      }
      function patchChildren(n1, n2, container) {
        if (typeof n2.children === 'string') {
          // 场景一
          if (Array.isArray(n1.children)) {
            n1.children.forEach(child => unmount(child))
          }
          setElementText(container, n2.children)
        } else if (Array.isArray(n2.children)) {
          // 场景二
          if (Array.isArray(n1.children)) {
            // diff 算法
          } else {
            setElementText(container, '')
            n2.children.forEach(c => patch(null, c, container))
          }
        } else {
          // 场景三
          if (Array.isArray(n1.children)) {
            n1.children.forEach(c => unmount(c))
          } else if (typeof n1.children === 'string') {
            setElementText(container, '')
          }
        }
      }
      ```

> 示例代码详见 2-code8.html

-----

##### 8.9 文本节点和注释节点

1. 文本节点和注释节点不具有标签名称，需要单独定义对应的类型

    ```js
    const Text = Symbol()
    const textVnode = {
      type: Text,
      children: 'this is text'
    }
    const Comment = Symbol()
    const commentVnode = {
      type: Comment,
      children: 'this is comment'
    }
    ```

2. 在 patch 方法中添加对文本节点和注释节点的处理逻辑

    ```js
    function patch(n1, n2, container) {
      // ...
      const { type } = n2
      if (typeof type === 'string') {
        // ...
      } else if (type === Text) {
        // 文本节点
        const el = n2.el = document.createTextNode(n2.children)
        if (!n1) {
          // 旧无，直接挂载
          insert(el, container)
        } else {
          // 旧有，更新内容
          const el = n2.el = n1.el
          if (n2.children !== n1.children) {
            el.nodeValue = n2.children
          }
        }
      } else if (type === Comment) {
        // 注释节点
        const el = n2.el = document.createComment(n2.children)
        if (!n1) {
          insert(el, container)
        } else {
          // ...
        }
      } else if (typeof type === 'object') {
        // 组件
      } else {
        // ...
      }
    }
    ```

3. 提取平台特有 API

> 示例代码详见 2-code9.html

-----
