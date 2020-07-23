// 生命周期变更





// react核心
// 虚拟DOM  diff算法  遍历可以值
// react-dom
// react-router




// fiber核心







// 渲染一个react
// 分为首次渲染和更新渲染
// 生命周期, 建立虚拟dom, 进行diff算法
// 对比新旧dom, 节点对比, 将算法复杂度从O(n^3)降低到O(n)
// key值优化, 避免使用index作为key值




// 高阶组件 HOC




// hook





// redux  vs  dva  vs  vuex
// 1 redux 通过store存储, 通过action唯一更改, reducer描述如何更改, dispatch 一个action
// 2 dva 给予redux, 结合react-saga进行封装
// 3 vuex 集成化, action异步, mutations同步






// react 和 vue 的区别
// 1 react整体是函数式的思想, 把组件设计成纯组件, 状态和逻辑通过参数传入, 单向数据流, 需要手动优化
// vue 双向数据流, 通过建立Watcher观察数据变化并响应dom更新, 自动关优化, state状态过多时会卡顿

// 2 react all in js, 设计了jsx, 通过js操作html和css
// vue将html css js 组合到一起, 用各自的方式处理, vue有单文件, 可以把html css js等写入到一个文件中, 通过html模板引擎处理

// 3 react 是类式的写法, api很少
// vue 是声明式的写法, 通过传入各种options, api和参数很多

// 4 react 通过HOC扩展
// vue 通过minixs扩展

// 5 react很多交给社区去做
// vue 很多内置, 直接使用





// react单向数据流
// 通过prop传递给子组件, 如果props发生变化, 重新渲染所有的子组件
