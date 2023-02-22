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

- 为什么一个字符串可以有 length 属性？
- 指的是与数值、字符串、布尔值分别相对应的 Number、String、Boolean 三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象
- 创建包装对象 -> 调用方法 -> 立即销毁

##### 3、闭包 ⭐️⭐️

- 当一个函数内部可以访问外部函数的作用域时，产生了闭包

##### 4、内存泄漏

##### 5、es5 继承相关 ⭐️⭐️⭐️

- 原型链继承
- 构造函数继承
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合继承

##### 6、作用域 & this

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

- this 继承

##### 7、原型链

- 如何创建一个没有 prototype(原型) 的对象
  ![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/prototype.jpg)

##### 8、变量提升

- 函数提升优先，函数体会跟随函数声明一起提升
- 函数同名变量提升会被忽略

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

##### 13、面试题：手写 es5 继承(5 种) ⭐️⭐️⭐️

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/%E7%BB%A7%E6%89%BF.md)

##### 14、面试题：实现 new / instanceOf / create ⭐️⭐️

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/new-create-instanceof.js)

##### 15、面试题：数据类型判断

- typeof
- instanceOf
- 内部属性\[[Class]]:['object Xxx']

##### 16、面试题：描述 Javascript 中相等和全等的区别

![代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/equal.png)

##### 17、面试题：实现 a == 1 && a == 2 ⭐️⭐️

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/a%20==%201%20&%20a%20==%202.js)

##### 18、面试题：实现一个 event 类(发布订阅模式/观察者模式) ⭐️⭐️⭐️

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/event-bus.js)

##### 19、面试题：实现一个金钱格式化函数 1000000 => 1,000,000

```js
const formatNumber = (val) => {
  return val.replace(/(?!^)(?=(\d{3})+(?!\d))/g, ',')
}
```

##### 20、面试题：实现一个并发请求控制函数 asyncPool

- [代码实现](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/async-load-image.js)
