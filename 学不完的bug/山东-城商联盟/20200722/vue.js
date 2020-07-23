// v-model 双向绑定
// 简化版
var obj = {}
var value
Object.defineProperty(obj, 'data', {
    get: function () {
        return value
    },
    set: function (val) {
        if (value !== val) {
            value = val
        }
    }
})

obj.data = 'sss'

console.log(obj)
console.log(obj.data)

// 详细版
function _obeserve(obj) {
    var value
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            value = obj[key]
            if (typeof value === 'object') {
                this._obeserve(value)
            }
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function() {
                    return value
                },
                set: function(val) {
                    if (value !== val) {
                        value = val
                    }
                }
            })
        }
    }
}


// vue 组件通信
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
// 11 路由传参
// 12 Vue.observable
// 13 broadcast dispatch - 1.x



// 动态组件
// <component :is="`${引入的组件变量}`"></component>
// 组件缓存与过渡效果包裹
{/* <keep-alive>
    <transition>
        <component :is="`${引入的组件变量}`"></component>
    </transition>
</keep-alive> */}






// 递归组件
// 组件在模板在递归的调用自己, 必须设置name
// 需要设置一个条件结束递归调用







// 函数式组件
// 无状态 无法实例化 内部没有任何生命周期处理方法



// vue异步组件
// Vue.component('async-com', () => import('./async-com'))








// 过滤器 filters  全局 / 局部
// import * as filters from '.'
// Object.keys(filters).forEach(key => VTTCue.filter(key, filters[key]))





// 混入 minixs 数组参数 全局 / 局部
// 扩展 extends 单个参数 全局 / 局部





// Vue.component  全局注册组件
// components 局部注册组件



// vue.$set()
// 利用数组的 push splice 实现响应式



// vue 事件修饰符
// .stop 阻止冒泡
// .once 仅触发一次
// .prevent 阻止默认行为
// .self 仅绑定元素自身触发
// .passive 滚送事件的默认行为 不能与prevent同时使用




// v-cloak
// 指令保存在元素上直至便已完成, 避免渲染时变量闪烁
// css [v-cloak] { display: none; }


// 自定义按键修饰符别名
// Vue.config.keyCodes.f2 = 113
// <input type="text" @keyup.f2="add" />



// 按键修饰符和按键码
// .enter
// .tab
// .delete 捕获删除和退格
// .esc
// .space
// .up
// .down
// .left
// .right





// 错误与警告捕获
// Vue.config.errorHandler = function(err, vm, info) {}
// info Vue特定的错误信息, 比如错误所在的生命周期等 2.2.0+

// Vue.config.warnHandler = function(msg, vm, trace) {}
// trace 组件的继承关系追踪




// vue 自定义指令
// v-directive
// 指令自定义钩子函数 - bind inserted update componentUpdated unbind






// soe
// ssr 服务端渲染
// meta-info nuxt prerender-spa-plugin 插件


// Vue.use()
// 注册组件, 触发组件的 install 方法


// v-pre vs v-once
// v-pre 不编译, 原样输出
// v-once 只编译一次

// 监听性能
// vue.prototype.performance = true

// 获取版本号
// Vue.version


// vue 生命周期 ⭐️
// beforeCreate -> created -> beforeMount -> mounted -> beforeDestroy -> destroyed

// 父子组件生命周期
// F beforeCreate -> F created -> F beforeMount -> C beforeCreate -> C created -> C beforeMount -> C mounted -> F mounted

// 子组件更新
// F beforeUpdate -> C beforeUpdate -> C updated -> F updated

// 父子组件销毁周期
// F beforeDestroy -> C beforeDestroy -> C destroyed -> F destroyed


// v-for key 复用
