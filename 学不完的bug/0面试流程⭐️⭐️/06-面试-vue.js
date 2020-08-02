// vue 生命周期 ⭐️⭐️
// beforeCreate -> created -> beforeMount -> mounted -> beforeDestroy -> destroyed

// 父子组件生命周期
// F beforeCreate -> F created -> F beforeMount -> C beforeCreate -> C created -> C beforeMount -> C mounted -> F mounted

// 子组件更新
// F beforeUpdate -> C beforeUpdate -> C updated -> F updated

// 父子组件销毁周期
// F beforeDestroy -> C beforeDestroy -> C destroyed -> F destroyed
// ************************************************************************************************************************

// 数组响应式方法 - vue 重写
// push  pop shift unshift sort reverse splice
// ************************************************************************************************************************


// vue 组件通信⭐️⭐️⭐️
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
// ************************************************************************************************************************


// vuex⭐️⭐️⭐️
// 由于vuex的单一状态树，会导致说随着应用庞大，应用要管理状态集合会很大，store 对象就会显得臃肿，难以管理，那就需要用到Module区分，每个Module都拥有自己的 state、mutation、action、getter

// vuex 五种属性
// state：vuex的基本数据，用来存储变量
// getter：从基本数据(state)派生的数据，相当于state的计算属性
// mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action) 
// action：Action 提交的是 mutation，并且可以包含任意异步操作，但不能直接变更状态
// modules：vuex模块化

// import { createNamespacedHelpers } from 'vuex'
// const { MapState, MapGetters, MapActions } = createNamespacedHelpers(`${storename}`)
// ************************************************************************************************************************





// ************************************************************************************************************************
// vue-router⭐️⭐️⭐️

// 两种路由模式
// hash #
// history - 服务器配置转发index.html, 避免404

// 路由方法 Vue.$router
// this.$router.push()
// this.$router.replace()
// this.$router.go()


// 路由组件解耦 ⭐️
// 带参路由设置 props: true


// 路由分组打包 chunk name
// const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
// Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
// ************************************************************************************************************************

// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
