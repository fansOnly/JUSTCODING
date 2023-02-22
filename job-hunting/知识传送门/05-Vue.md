### Vue 知识

<hr style="height:0px;border:none;border-top:2px solid #d8d8d8;" />

#### Vue 2/3

##### 1、响应式原理 ⭐️⭐️⭐️⭐️⭐️

- 发布订阅模式
- 数据劫持(Object.defineProperty)

##### 2、生命周期

- beforeCreate / setup：组件实例尚未创建
- created / setup：组件初始化完成（data，methods 等）
- beforeMount / onBeforeMount：DOM 初始化，尚未挂载
- mounted / onMounted：可以访问 DOM
- beforeUpdate / onBeforeUpdate：视图更新前，data 数据已更新
- updated / onUpdated：视图更新后，修改数据会重新触发更新
- beforeDestroy / onBeforeUnmount：卸载前，清除事件监听、计时器等
- destroyed / onUnmounted：销毁组件实例

![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/Vue/vue2-lifecycle.jpg)

##### 3、组件通信

- props & emit
- \$children & \$parent & \$root
- \$refs
- \$attrs & \$listeners
- provide & inject
- 6、Vuex
- Event Bus

##### 4、data 为什么是函数

- 根组件实例可以是一个对象
- 子组件实例必须是函数，避免组件复用时数据污染

##### 5、computed vs watch

- computed 具有缓存，懒计算，适用于计算/缓存某些值，产生新值，不应产生副作用，一般适用于复杂值的计算
- watch 是数据监听，依赖源数据执行逻辑，可设置 deep，immediate 属性，一般适用于通过源数据更新视图

##### 6、父子组件生命周期执行顺序

- 创建阶段
  - 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
- 更新阶段
  - 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 卸载阶段
  - 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

##### 7、Vue 中对于数组的特殊处理 ⭐️⭐️

- 重写数组方法，push、pop、unshift、shift、sort、splice、reverse
- 出于性能考虑，不支持通过索引赋值响应式，改变数组长度响应式

##### 8、Vue 中的修饰符

- 事件修饰符
  - stop、prevent、capture、once、self、native、passive
  - 执行顺序
    - v-on:click.prevent.self：阻止所有点击
    - v-on:click.self.prevent：阻止点击自身
- 绑定修饰符
  - lazy、number、trim

##### 9、v-if & v-for 同时使用

##### 10、什么是函数式组件

##### 11、Vue 解析 DOM 的过程

- 渲染优先级：render > template > el
- template -> 模板 AST -> JavaScript AST -> render -> DOM

##### 12、插槽相关：默认插槽 vs 命名插槽 vs 作用域插槽 ⭐️⭐️⭐️

##### 13、虚拟 DOM vs 真实 DOM

- 虚拟 DOM 是对真实 DOM 的一种描述形式，保留对真实 DOM 的引用

##### 14、Vue 中 key 的作用

- 节点复用
- 强制刷新

##### 15、Vue Diff 算法 ⭐️⭐️⭐️⭐️⭐️

- 双指针，首位 4 个索引，4 个虚拟节点
- 首空 / 尾空 / 首首 / 尾尾 / 首尾 / 尾首 / 新首找旧位
- 多余节点处理，新增、删除

##### 16、Vue 初始化的流程

- initMixin：\_init
  - initLifecycle
  - initEvents
  - initRender
  - hook: beforeCreate
  - initInjections
  - initState
    - initProps
    - initMethods
    - initData
    - initComputed
    - initWatch
  - initProvide
  - hook: created
- stateMixin：\$set、\$get、\delete、\$watch
- eventMixin：\$on、\$off、\$emit、\$once
- lifecycleMixin：\_update、\$forceUpdate、\$destroy
- renderMixin：\_render

##### 17、Vue SSR ⭐️⭐️⭐️⭐️

- 首屏 SSR，不绑定响应式和事件，只有 beforeCreate 和 created 钩子
- 渲染完成后，在客户端激活，在虚拟节点和真实 DOM 之间建立联系（vnode.el = el），为 DOM 元素添加绑定事件，后续变为 CSR

##### 18、Vue 和 React 的区别

- Vue 是渐进式 MVVM 框架，双向绑定，自动响应式，通过模板引擎开发
- React 是 MVC 框架，单向数据流，函数式编程，主要通过 JSX 开发

##### 19、Vue3 ⭐️⭐️⭐️⭐️⭐️

- Proxy
- Diff 算法优化（最长公共子字符串）
- 响应式优化，支持数组、Map、Set
- Composable API
- Teleport & Suspense
- 支持 Tree-shaking

##### 20、面试题：实现一个滚动虚拟列表 ⭐️⭐️⭐️⭐️⭐️

##### 21、如何设计一个组件：按钮 ⭐️⭐️⭐️⭐️

- 分析需求
- 设计代码
- 编写代码
- 单元测试

<hr style="height:0px;border:none;border-top:2px solid #d8d8d8;" />

### Vue-router

##### 1、路由模式

- hash 模式
  - URL 中包含 # 号，# 号后的部分不会被发送服务端
  - hash 值的改变不会引起页面刷新
  - 通过 window.onhashchange 监听路由变化
- history 模式
  - URL 较为美观
  - 借助 HTML5 的 history API 实现，通过监听 window.onpopstate 监听路由变化
  - 通过 pushState()、replaceState() 修改浏览器的历史记录，改变 URL 地址，但浏览器不会立即发起请求
  - back()、go()、forward()
  - 刷新 404：服务端 nginx 配置代理即可

##### 2、路由优化

- 路由懒加载

  - () => @import('a.vue');

- 路由分块打包
  - () => @import(/\* webpackChunkName: chunkName \*/ 'a.vue');

##### 3、路由守卫 ⭐️⭐️

- 全局守卫
  - beforeEach：全局前置钩子
  - beforeResolve：全局解析守卫
  - afterEach：全局后置钩子
- 路由独享守卫
  - beforeEnter：从一个不同的路由导航，进入路由时触发
- 组件内守卫
  - beforeRouterEnter：不能访问 this，使用 nextTick(vm => {})
  - beforeRouterUpdate
  - beforeRouterLeave

##### 4、完整的导航解析流程 ⭐️⭐️⭐️

1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave 守卫
3. 调用全局的 beforeEach 守卫
4. 在重用的组件里调用 beforeRouteUpdate 守卫
5. 在路由配置里调用 beforeEnter 守卫
6. 解析异步路由
7. 在激活的组件里调用 beforeRouteEnter 守卫
8. 调用全局的 beforeResolve 守卫
9. 导航被确认
10. 调用全局的 afterEach 守卫
11. 触发 DOM 更新
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，并将创建好的组件实例当作参数传入

##### 5、面试题：路由权限控制 ⭐️⭐️⭐️⭐️

- router.addRoute()
- router.hasRoute()
- router.getRoutes()

<hr style="height:0px;border:none;border-top:2px solid #d8d8d8;" />

### Vuex

##### 1、五要素

- state：数据
- getters：具有缓存属性的数据
- mutations：同步需改 state 的值，默认只能通过 mutations 修改
- actions：异步修改 state 的值，通过调用 mutations 中定义的函数修改
- modules：模块化
  - namespaced:true

##### 2、如何解决页面刷新时 Vuex 数据丢失 ⭐️⭐️⭐️

- 将部分数据存放在缓存中
- 页面离开时（beforeunload）缓存，进入时（mounted）从缓存取出赋值给 vuex
