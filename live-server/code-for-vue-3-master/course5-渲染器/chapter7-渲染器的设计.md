#### 七、渲染器的设计

-----

##### 7.1 渲染器和响应系统的结合

1. 利用响应系统的能力，自动调用渲染器完成页面的渲染和更新

    ```js
    const { effect, ref } = VueReactivity
    function renderer(domString, container) {
      container.innerHTML = domString
    }
    const count = ref(1)
    effect(() => {
      renderer(`<h1>${count.value}</h1>`, document.getElementById('app'))
    })
    count.value++
    ```

> 示例代码详见 1-code1.html

-----

##### 7.2 渲染器的基本概念

1. 渲染器的作用：把虚拟 DOM 转换为特定平台的真实元素（真实 DOM），渲染 DOM 或者激活 DOM（同构渲染）
    - 虚拟 DOM：virtual DOM，vnode / vdom

2. 挂载：渲染器把虚拟 DOM 节点渲染为真实 DOM 节点的过程（mount）
    - mounted 钩子在挂载完成后触发

3. 容器元素：渲染器接受一个挂载点作为参数，用来指定具体的挂载位置（container）

    ```js
    function createRenderer() {
      // 挂载
      function render(vnode, container) {
        // ...
      }
      // 激活
      function hydrate(vnode, container) {
        // ...
      }
      return {
        render,
        hydrate
      }
    }
    ```

4. 打补丁/更新：当多次在同一个 container 上进行渲染时，渲染器在第一次挂载完之后，后续需要执行更新动作（patch）

    ```js
    function createRenderer() {
      function render(vnode, container) {
        if (vnode) {
          // 挂载
          patch(container._vnode, vnode, container)
        } else {
          // 存在旧节点，不存在新节点，执行卸载
          if (container._vnode) {
            container.innerHTML = ''
          }
        }
        // 将当前渲染的 vnode 当作下一次渲染的旧 vnode
        container._vnode = vnode
      }
      return render
    }
    /**
     * @param {} n1 旧 vnode
     * @param {} n2 新 vnode
     * @param {} container 容器
     */
    function patch(n1, n2, container) {
      // ...
    }
    ```

-----

##### 7.3 自定义渲染器

1. 跨平台能力：抽离平台特定的 API，为抽离的 API 提供可配置的接口

    ```js
    const vnode = {
      type: 'h1',
      children: 'hello'
    }
    function createRenderer() {
      function patch(n1, n2, container) {
        if (!n1) {
          // 首次挂载
          mountElement(n2, container)
        } else {
          // 打补丁
        }
      }
      // 挂载元素
      function mountElement(vnode, container) {
        const el = document.createELement(vnode.type)
        if (typeof vnode.children === 'string') {
          el.textContent = vnode.children
        }
        container.appendChild(el)
      }
      function render(vnode, container) {
        if (vnode) {
          patch(container._vnode, vnode, container)
        } else {
          if (container._vnode) {
            container.innerHTML = ''
          }
        }
        container._vnode = vnode
      }
      return {
        render
      }
    }
    ```

2. 上述代码存在依赖浏览器平台的特定 API，如 document.createElement/el.textContent 等，需要将这些操作 DOM 的 API 作为配置项传入

    ```js
    function createRenderer(options) {
      const { createElement, insert, setElementText } = options
      // ...
      function mountElement(vnode, container) {
        const el = createElement(vnode.tag)
        if (typeof vnode.children === 'string') {
          setELementText(el, vnode.children)
        }
        insert(el, container)
      }
    }
    // 调用
    createRenderer({
      createELement(tag) {
        return document.createElement(tag)
      },
      setElementText(el, text) {
        el.textContent = text
      },
      /**
       * @param parent 新插入节点的父节点
       * @param el 插入的节点
       * @param anchor 将要插入这个节点之前，如果为 null，新节点将插入到子节点的末尾
       */
      insert(el, parent, anchor = null) {
        parent.insertBefore(el, anchor)
      }
    })
    ```

> 示例代码详见 1-code2.html
