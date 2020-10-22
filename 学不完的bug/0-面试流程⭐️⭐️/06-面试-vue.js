// ***********************************************vue 生命周期 ⭐️⭐️********************************************************
// beforeCreate -> created -> beforeMount -> mounted -> beforeDestroy -> destroyed

// 父子组件生命周期
// F beforeCreate -> F created -> F beforeMount -> C beforeCreate -> C created -> C beforeMount -> C mounted -> F mounted

// 子组件更新
// F beforeUpdate -> C beforeUpdate -> C updated -> F updated

// 父子组件销毁周期
// F beforeDestroy -> C beforeDestroy -> C destroyed -> F destroyed

// ********************************************** vue 双向绑定原理⭐️⭐️⭐️ ***************************************************

// 1 数据劫持
// 2 发布订阅模式


// vue中是如何监听数组变化 ⭐️⭐️ - vue 重写
// push  pop shift unshift sort reverse splice


// v-for 的优先级高于 v-if

// assets 和 static的区别
// 1 assets 会打包处理
// 2 static 不经过打包，直接上传，适用于第三方已经被处理过的资源文件

// props vs data
// computed vs watch ⭐️⭐️

// ************************************************* vue 组件通信⭐️⭐️⭐️ ***************************************************

// 1 props $emit
// 2 EventBus
// 3 vuex
// 4 $refs
// 5 provide inject
// 6 v-slot
// 7 $attrs $listeners
// 8 $parent $children
// 9 $root $children
// 10 .sync $emit
// 11 Vue.observable
// 12 broadcast dispatch - 1.x

// ************************************************* vuex⭐️⭐️⭐️ **********************************************************

// 由于vuex的单一状态树，会导致说随着应用庞大，应用要管理状态集合会很大，store 对象就会显得臃肿，难以管理，那就需要用到Module区分，每个Module都拥有自己的 state、mutation、action、getter

// vuex 五种属性
// state：vuex的基本数据，用来存储变量
// getter：从基本数据(state)派生的数据，相当于state的计算属性
// mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action) 
// action：Action 提交的是 mutation，并且可以包含任意异步操作，但不能直接变更状态
// modules：vuex模块化

// import { createNamespacedHelpers } from 'vuex'
// const { MapState, MapGetters, MapActions } = createNamespacedHelpers(`${storename}`)

// ************************************************** vue-router⭐️⭐️⭐️ ****************************************************

// 三种路由模式
// hash
// 1 hash + hashChange 不重载页面
// history
// 1 historyApi + popState
// 2 服务器配置转发index.html, 避免404
// abstract

// 路由方法 Vue.$router
// this.$router.push()
// this.$router.replace()
// this.$router.go()

// 路由钩子函数
// 1 beforeEach
// 2 afterEach


// 路由组件解耦 ⭐️
// 带参路由设置 props: true


// 路由分组打包 chunk name
// const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
// Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。


// router-link 在android有bug
// vue2中注册在router-link上的click事件会被阻止，使用.native修饰符

// ************************************************************************************************************************

// MVC vs MVVM
// model - 数据层
// view - 视图层
// controller - 控制层
// view-model 双向绑定

// 1 mvc 单向数据流    mvvm 双向绑定
// 2 mvvm 实现了业务逻辑组件的重用

// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
