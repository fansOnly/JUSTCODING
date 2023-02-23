### CSS 知识

<hr style="height:0px;border:none;border-top:2px solid #d8d8d8;" />

##### 1、HTML 加载样式的几种方式

- 外部样式文件链接 <link src="" />
- 导入外部样式 @import "";
- 内联样式 <style></style>
- 行内样式 style=""

##### 2、CSS 选择器

- !important - 10000
- inline style - 1000
- ID 选择器（#box）- 100
- 类选择器（.box），属性选择器（[type="input"]），伪类（:hover）- 10
- 元素选择器（p），伪元素（::after） - 1
- 通配符选择符（\*），关系选择符（+, >, ~, " "(后代选择器), ||），否定伪类（:not()）对优先级没有影响 - 0

##### 3、FOUC

- 无样式内容闪烁（Flash of UnStyled Content），在 IE 下通过 @import 引入 CSS 文件引起的

##### 4、边距折叠

##### 5、BFC - BLOCK FORMATTING CONTEXT

- 根元素 <html>
- 浮动元素 float 不为 none
- 绝对定位元素 position 不为 relative
- 行内块元素 display: inline-block
- 表格相关 display: table / table-cell / ...
- overflow 不为 visible
- 弹性元素 display: flex / inline-flex
- 网格元素 display: grid / inline-grid

###### 5.1、BFC 为什么能清除浮动？

- BFC 元素之间都是相互独立的，内部浮动不会影响到外界其他元素

##### 6、盒子模型

- IE 怪异盒子模型：content + padding + border
- 标准盒子模型：content

###### 6.1、盒子宽度

- clientWidth
  - width + padding-L-R
- offsetWidth
  - width + padding-L-R + border-L-R
- scrollWidth
  - 获取指定标签层的真实宽度
  - 可视区域宽度 + 隐藏区域宽度

##### 7、Flex 布局 ⭐️⭐️

- flex 属性
- display
  - flex
  - inline-flex
- flex-direction
  - row
  - row-reverse
  - column
  - column-reverse
- flex-wrap
  - nowrap
  - wrap
  - wrap-reverse
- align-items
  - flex-start
  - center
  - flex-end
  - stretch
- justify-content

  - flex-start
  - center
  - space-between
  - space-around
  - flex-end

- flex: auto / 0 / 1
  - flex-grow：放大规则，容器分配剩余空间的相对比例
  - flex-shrink：缩小规则
  - flex-basis：主轴方向的初始大小

##### 8、CSS 优化、提高性能的方法

1. 多个 css 合并，尽量减少 HTTP 请求
2. 将 css 文件放在页面最上面
3. 移除空的 css 规则
4. 避免使用 CSS 表达式
5. 选择器优化嵌套，尽量避免层级过深
6. 充分利用 css 继承属性，减少代码量
7. 抽象提取公共样式，减少代码量
8. 属性值为 0 时，不加单位
9. 属性值为小于 1 的小数时，省略小数点前面的 0
10. css 雪碧图

##### 9、面试题：谈谈响应式布局 ⭐️⭐️

- 媒体查询：
- 百分比：
- rem：相对根元素
  - 淘宝 flexible.js - px 转 rem
- em：相对父元素
- vw/vh：视口单位
- rpx：微信小程序

##### 10、面试题：CSS 实现三角形

```js
  .triangle-bottom {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px;
    border-color: #f00 transparent transparent;
  }
```

##### 11、面试题：CSS 实现扇形

```js
  .triangle-bottom {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px;
    border-color: #f00 transparent transparent;
    border-radius: 10px;
  }
```

##### 12、面试题：实现不定宽高元素水平垂直居中 ⭐️

```js
  // 1. flex 布局 - 不定宽高
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  // 2. 定位 - 不定宽高
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* margin: -50% -50% 0 0; */
  }
  // 3. 固定元素
  .center {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
```

##### 13、面试题：品字布局/圣杯布局/双飞翼布局

##### 14、面试题：display: none / visibility: hidden / opacity: 0 的区别

- display: none，节点不渲染，页面不显示，不占位置
- visibility: hidden，页面不显示，占位置，点击不触发绑定事件
- opacity: 0，页面不显示，占位置，点击触发绑定事件
