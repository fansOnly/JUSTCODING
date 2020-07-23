// vue-router

// 两种路由模式
// hash #
// history


// 路由配置
// name component path


// 路由解耦 ⭐️
// 带参路由设置 props: true


// 全局路由钩子

// 1 router.beforeEach
// 全局前置守卫, 登陆拦截
// 手动调用 next()

// 2 router.beforeResolve

// 3 router.afterEach




// 组件路由钩子

// 1 beforeRouterEnter
// 不能直接访问this
// 通过next访问组件实例

// 2 beforeRouterUpdate

// 3 beforeRouterLeave



// 路由方法 Vue.$router
// this.$router.push()
// this.$router.replace()
// this.$router.go()



// 路由对象属性 Vue.$route
// name 路由名称
// path 路由路径
// params 传参接收值
// query 传参接收值
// fullPath 解析后的url 包含查询参数和hash的完整路径
// matched 路由记录副本
// redirectedFrom 重定向来源路由





// 路由复用 key
// 使用key值, 相同的组件跳转也会执行 created 和 mounted
{/* <router-view :key="key"></router-view> */}
