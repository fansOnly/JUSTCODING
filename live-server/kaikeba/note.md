# Vue 响应式的理解

1. Vue 的更新是组件级的, 每一个组件只有一个 watcher 与之对应
2. 通过 Object.defineProprtty() 和 发布订阅模式
3. Dep 类维护订阅者, 触发更新 / notify() depend(watcher)
4. Watcher 类维护观察者, 依赖收集 / get() update() depend(dep)
5. dep 和 watcher 相互循环引用
6. 通过 getter 进行依赖收集, 通过 setter 派发更新
7. 更新使用二次提交的方式 / depIds() newDepIds()
8. watcher 的 update 分为三种类型: lazy - 计算属性 / sync - ssr / async
9. Vue 维护一个全局的 Watcher 实例, 绑定当前进行响应式的属性 / Dep.target
10. Vue 维护一个 watcher 队列, 通过 nextTick 实现异步更新

---

## v-if v-for 的优先级

1. v-for 的优先级大于 v-if
源码位置：compiler/codegen/index line 64

```js
<li v-for='i in 3' v-if='true'>
  hello
</li>

with (this) {
  return _c(
    'div',
    { attrs: { id: 'app' } },
    [
      _l(list, function (item, index) {
        return checked ? _c('li', [_v(_s(item.name))]) : _e();
      }),
      _v(' '),
      _c('hr'),
      _v(' '),
      _c('hr'),
    ],
    2
  );
}
// 先渲染的列表，然后在列表里面渲染判断条件

<template v-if="checked">
    <li v-for="(item, index) in list">{{item.name}}</li>
</template>

with (this) {
  return _c(
    'div',
    { attrs: { id: 'app' } },
    [
      _c('hr'),
      _v(' '),
      checked
        ? _l(list, function (item, index) {
            return _c('li', [_v(_s(item.name))]);
          })
        : _e(),
      _v(' '),
      _c('hr'),
    ],
    2
  );
}
// 先判断条件，满足条件在渲染列表
```

2. 如果需要同时渲染，可以借助 computed

---

## key 的作用

1. 循环数组时，如果不提供 key 值，或默认把索引当作 key 值
2. 更新时，会对比更新前后的节点 key 值，相同的 key 值会被复用
3. transition-group 通过设置 key 可以触发过渡效果

---

## diff 算法

1. 必要性: core/instance/lifecycle.js - mountComponent()
2. 执行方式: core/vdom/patch.js - patchVnode()
3. 高效性: core/vdom/patch.js - updateChildren()

##### 1. 双指针

##### 2. 深度优先，同级比较

+ 先比较层级是否相同，是否都有子节点
+ 同层之间，先比较头头, 在比较尾尾, 在比较头尾, 在比较尾头
+ 其他情况在按照普通的遍历方式对比

---

## Vue 组件化

组件是独立的可复用的代码组织单元
具有良好的维护性、复用性、测试性
组件化实现是通过 - core/global-api/assets.js line 23 extend()
组件的实例化及挂载 -  core/vdom/patch.js line 145 createElm() -> core/vdom/create-component.js line 37 init()

组件分类：页面组件、业务组件、通用组件
组件应该是高内聚、低耦合的
组件应该遵循单项数据流的原则

1. 构造函数创建组件

```js
// VueComponent 类
Vue.component('test', {
  template: '<div></div>'
})
```

2. 单文件组件 - 通过 vue-loader 编译

```js
// test.js
<template>
  <div></div>
</template>
```

#### Vue 3.0

1. 更快

+ 虚拟 DOM 重写

  + 跳过不必要的条件分支
  + JS 引擎更容易优化

+ 优化 slots 的生成

  + vue3 可以单独重新渲染父组件和子组件
  + 确保实例正确的跟踪依赖关系
  + 避免不必要的父子组件重新渲染

+ 静态树提升

  + vue3 能检测到什么是静态的，然后将其提升，降低渲染成本
  + 跳过修补整棵树，从而降低渲染成本
  + 即使多次出现也能正常工作

+ 静态属性提升

  + 使用静态属性提升，patch 时将跳过这些属性不会改变的节点

+ 基于 Proxy 的响应式系统

  + 组件初始化速度提升100%
  + 节省以前一般的内存开销，但是版本兼容性不好

2. 更小

+ 通过摇树优化核心代码提及

3. 更易维护

+ TypeScript + 模块化

4. 更加友好

+ 跨平台: 编译器核心和运行时核心与平台无关

5. 更易使用

+ 更好的调试支持
+ 独立的响应化模块
+ Composition API
