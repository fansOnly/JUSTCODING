#### 二、框架设计的核心要素

-----

##### 2.1 提升用户的开发体验

+ 友好的警告信息
+ 方便的开发调试：initCustomFormatter

-----

##### 2.2 控制框架代码的体积

+ 适当的条件编译

-----

##### 2.3 良好的 Tree-Shaking

+ ESM 模块：ES Module
+ 剔除 dead code
+ 副作用函数：调用的时候会对外部产生影响，例如修改了全局变量

```js
// 告诉打包工具不会产生副作用，可以 Tree-Shakings
/* #__PURE__ */
```

-----

##### 2.4 不同的构建产物

+ iife：适用于浏览器引入的暴露全局变量的格式
+ cjs：适用于 CommonJs 的格式
+ esm：适用于现代浏览器支持原生 ESM 的格式
+ umd：兼容 cjs 和 iife 格式

-----

##### 2.5 特性开关

+ 暴露给用户的可选功能
+ 可以利用 Tree-Shaking 优化
+ __VUE_OPTIONS_API__

-----

##### 2.6 错误处理

+ 暴露给用户注册的统一错误拦截函数
+ registerErrorHandler - utils.js

```js
import utils from 'utils.js'

utils.registerErrorHandler((e) => {
  console.log(e)
})

utils.foo(() => {})
```

-----

##### 2.7 良好的 TypeScript 类型支持

```ts
let str: string = 'hello'

// 函数声明
function add(a: number, b: number): number {
  return a + b
}

// 接口
interface User {
  name: string;
  age?: number;
}

// 泛型
function foo<T extends any>(val: T): T {
  return val
}
```
