#### 三、Vue.js 3 的设计思路

-----

##### 3.1 声明式的描述 UI

1. 前端页面需要哪些元素

+ DOM 元素：标签元素，div / a
+ 属性：标签属性，class / id
+ 事件：标签绑定事件，click 、 keydown
+ 元素的层级结构：DOM 树的层级，子节点、父节点

-----

##### 3.2 渲染器

1.这是一个虚拟 DOM 的描述

```js
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
}
```

+ tag：描述标签名称
+ props：描述标签属性、事件
+ children：描述标签的子节点

2.实现渲染器

> 示例代码详见 code1.html

+ renderer 函数接收两个参数
  + vnode：虚拟 DOM 对象
  + container：真实 DOM 元素，作为挂载点

+ 实现思路
  + 创建元素：vnode.tag => document.createElement
  + 添加属性和事件：vnode.props => onXXX => el.addEventListener
  + 处理 children：text => document.createTextNode | Array => 递归

3.组件的本质

+ 组件就是一组 DOM 元素的封装，也可以用虚拟 DOM 表示

```js
// 这是一个组件
function MyComponent() {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('hello')
    },
    children: 'click me'
  }
}

// 这是 vnode
const component = {
  tag: MyComponent,
}
```

+ 优化 renderer 函数
  + mountElement
  + mountComponent

> 示例代码详见 code2.html

4.组件的描述也可以是一个对象

+ 返回一个 render 函数

> 示例代码详见 code3.html

-----

##### 3.3 模板的工作原理 - 编译器

1. 编译器的作用是将模板编译为渲染函数
2. 对于一个组件来说，它要渲染的内容最终都是通过渲染函数产生的，然后渲染器再把渲染函数返回的虚拟 DOM 渲染为真实 DOM
3. 编译器和渲染器之间是存在信息交流的，交流的媒介就是虚拟 DOM
