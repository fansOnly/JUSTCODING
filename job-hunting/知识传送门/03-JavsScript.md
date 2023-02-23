### JavaScript 知识

<hr style="height:0px;border:none;border-top:2px solid #d8d8d8;" />

##### 1、数据类型

- 基本类型
  - Undefined
  - Null
  - Boolean
  - String
  - Number
  - Symbol
  - BigInt
- 引用类型：Object
  - Object
  - Array
  - Function
  - Date
  - RegExp
  - ...

##### 2、包装对象

- 指的是与数值、字符串、布尔值分别相对应的 Number、String、Boolean 三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象
- 伪代码
  - 创建包装对象 -> 调用方法 -> 立即销毁
- 为什么一个字符串可以有 length 属性？

  ```js
  const str = 'str'
  const len = str.length

  const str2 = new String('str')
  const len = str2.length
  str2 = null
  ```

##### 3、闭包 ⭐️⭐️

- 当一个函数内部可以访问外部函数的作用域时，产生了闭包

##### 4、内存泄漏

- 过多的全局变量
- 未清除的事件绑定
- 未清除的计时器
- 不合理的闭包

##### 5、es5 继承相关 ⭐️⭐️⭐️

- 原型链继承
- 构造函数继承
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合继承
  - [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/%E7%BB%A7%E6%89%BF.md)

##### 6、作用域 & this

- JavaScript 是静态作用域，在函数定义时就确定了作用域

- 作用域分类

  - 全局作用域
  - 函数作用域
  - 块级作用域

- 执行上下文

  - 创建过程
    - 创建变量对象
    - 生成作用域连
    - 确定 this 指向
  - 执行过程
    - 变量赋值
    - 函数引用
    - 执行其他代码

- 作用域链

  - 访问一个对象的属性时，先在自身属性中查找，如果没有，再沿着\_\_proto\_\_这条链向上找，这就是原型链

- 函数创建和执行过程解析

  ```js
   var str = 'global value'
   function fn() {
     var str2 = 'local value'
     return str2
   }
   fn()

   // 1. 函数 fn 被创建，保存作用域链到内部属性 [[scope]]
   ECStack = {
     GlobalContext
   }
   fn.[[scope]] = {
     GlobalContext: VO
   }
   // 2. 执行 fn 函数，创建函数执行上下文，并将函数执行上下文压入栈顶
   ECStack = {
     fnContext,
     GlobalContext
   }
   // 3. 复制函数 [[scope]] 属性创建作用域链
   fnContext = {
     Scope: fn.[[scope]]
   }
   // 4. 创建 AO，创建 arguments 对象，创建函数声明和变量声明
   fnContext = {
     AO: {
       arguments: {
         length: 0
       },
       str2: undefined
     },
     Scope: [Scope]
   }
   // 5. 将活动对象 AO 压入作用域链
   fnContext = {
     AO: {
       arguments: {
         length: 0
       },
       str2: undefined
     },
     Scope: [AO, Scope]
   }
   // 6. 执行函数，str2 赋值
   fnContext = {
     AO: {
       arguments: {
         length: 0
       },
       str2: 'local value'
     },
     Scope: [AO, Scope]
   }
   // 7. 函数执行完，将函数执行上下文弹出
   ECStack = {
     GlobalContext
   }
  ```

- 分解执行上下文过程

  ```js
   let a = 20;
   const b = 30;
   var c;
   function multiply(e, f) {
       var g = 20;
       return e * f * g;
   }
   c = multiply(20, 30);

   // 伪代码示例
   // 1. 全局执行上下文
   GlobalExecutionContext = {
     ThisBinding: <GLobal Object>,
     LexicalEnvironment: { // 词法环境
       EnvironmentRecord: {
         Type: 'Object',
         a: <uninitialized>,
         b: <uninitialized>,
         multiply: <func>
       },
       outer: null
     },
     VariableEnvironment: { // 变量环境
       EnvironmentRecord: {
         Type: 'Object',
         c: undefined
       },
       outer: null
     }
   }
   // 2. 函数执行上下文
   FunctionExecutionContext = {
     ThisBinding: <GLobal Object>,
     LexicalEnvironment: {
       EnvironmentRecord: {
         Type: 'Declarative',
         Arguments: {
           0: 20,
           1: 30,
           length: 2
         }
       },
       outer: <GlobalLexicalEnvironment>
     },
     VariableEnvironment: {
       EnvironmentRecord: {
         Type: 'Declarative',
         g: undefined
       },
       outer: <GlobalLexicalEnvironment>
     }
   }
  ```

##### 7、原型链

- 如何创建一个没有 prototype(原型) 的对象
  ![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/prototype.jpg)

##### 8、变量提升

- 变量声明和函数声明在预编译阶段都会被提升到作用域的最顶端，函数提升的优先级高于变量提升
  - 变量提升只提升声明，不提升赋值
  - 函数提升会将函数体一起提升
  - 如果存在同样名称的变量声明和函数声明，变量声明会被忽略

##### 9、bind vs call vs apply

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/call-apply-bind.js)

##### 10、事件循环：EventLoop ⭐️⭐️⭐️

![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/event-loop.PNG)

##### 11、requestAnimationFrame ⭐️⭐️

- CPU 节能：页面未激活时，屏幕刷新任务也停止了
- 函数节流：保证在每个刷新周期内（16.7ms for 60Hz）只执行一次

- [demo 示例](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/request-animation-frame.html)

##### 12、正则相关 ⭐️⭐️⭐️

![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/regexp.jpg)

##### 13、面试题：实现 new / instanceOf / create ⭐️⭐️

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/new-create-instanceof.js)

##### 14、面试题：数据类型判断

- typeof
- instanceOf
- 内部属性\[[Class]]:['object Xxx']

##### 15、面试题：描述 Javascript 中相等和全等的区别

![代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/equal.png)

##### 16、面试题：实现 a == 1 && a == 2 ⭐️⭐️

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/a%20==%201%20&%20a%20==%202.js)

##### 17、面试题：实现一个 event 类(发布订阅模式/观察者模式) ⭐️⭐️⭐️

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/event-bus.js)

##### 18、面试题：实现一个金钱格式化函数 1000000 => 1,000,000

```js
const formatNumber = (val) => {
  return val.replace(/(?!^)(?=(\d{3})+(?!\d))/g, ',')
}
```

##### 19、面试题：实现一个并发请求控制函数 asyncPool

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/async-load-image.js)
