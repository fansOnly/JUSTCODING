##### 渲染函数 render

渲染函数可以渲染模板，也可以渲染组件

```js

// 渲染模板
export default {
    render(h) {
        return h('div', {}, [...])
    }
}

// 渲染一个组件
import { h } from 'Vue'
import MyComponent from ''

h(MyComponent, {
    props: {...}
})
```

通过 Vue CLI 创建的项目，初始化 app 的时候是通过渲染 App 组件的方式调用的

一个组件可以返回另外一个组件作为自己的跟节点，这个外部组件不会渲染它的任何东西，而是渲染另外一个组件

```js
// 将根实例和应用程序的组件职责分离
// 根实例挂载路由，状态等，由于技术限制，无法实现热重载
// 应哟过程序组件可以热重载
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
```

##### 函数式组件

函数式组件中没有 this

在父组件中使用函数组件时，函数组件的 render 函数会比父组件的 render 函数更早调用。

优化长列表时，可以尝试函数式组件

```js
export default {
    functional: true,
    props: [...],
    render(h, context) {
        // 这里没有 this 指向，使用 context 上下文
        // conetxt.props
        // context.slots()
        // context.children
        // context.parent => 父组件，一般会指向根节点，而不是上级包裹组件，因为它比上级包裹组件渲染的早
    }
}

Vue.component('example', {
    props: ['tags'],
    functional: true,
    render(h, { props: { tags } } ) {
        return h('div', {
            attrs: {
                id: 'hello'
            }
        }, tags.map((tag, i) => h(tag, i)))
    }
})


// JSX 语法
const Example = {
    functional: true,
    render(h, { props: { tags } }) {
        return <div>{tags.map((tag, i) => h(tag, i))}</div>
    }
}

// 类似 React 函数式组件
const Example = (h, { props: { tags } }) => {
    return <div>{tags.map((tag, i) => h(tag, i))}</div>
}
```

#### 4、状态管理 Vuex

mutations

+ 同步更新状态，devtools 集成，时间快照会捕获每次的状态改变，通过比较改变前和改变后的函数，如果是异步，就无法预知状态改变的节点，无法生成快照
+ 接受 state 作为参数

actions

+ 执行异步操作

#### vue-router

```js
'/user/:username'
{
  username: '123'
}

'/user/123?foo=bar'
{
  path: '/user/123',
  params: { username: '123' },
  query: { foo: 'bar' }
}
```

#### 6、表单验证

表单验证的两种形式

+ Markup-based: vee-validate, html 格式的验证规则

```js
<input rule="{}" />
```

+ Model-based: vuelidate, 基于 javaScript 的验证规则

##### Vue 生命周期

beforeCreate: 响应式系统尚未创建
