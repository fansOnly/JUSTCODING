### HTML 基础

<hr style="height:0px;border:none;border-top:2px solid #d8d8d8;" />

##### 1、DOM 操作

- 离线操作
- Fragment

##### 2、重绘和回流 ⭐️⭐️

- 浏览器从左上角到右下角渲染
- 重绘：元素外观改变触发的浏览器行为

  - 重绘并不一定导致重排
  - 重绘场景
    - color
    - background
    - border-style
    - border-radius
    - box-shadow

- 重排：重新生成布局，重新排列元素

  - 重排一定导致重绘
  - 重排场景

    - 页面初始渲染
    - 添加、删除元素
    - 改变元素的位置
    - 改变元素尺寸
    - 改变元素内容
    - 改变字体大小
    - 改变窗口尺寸
    - 添加伪类
    - 设置 style
    - 获取某些属性、调用某些计算方法

- 优化

  - 离线操作 DOM
  - 通过 className 改变样式
  - 脱离文档流
  - 读取缓存值
  - GPU 加速：使用 transform / opacity / filter 等属性

##### 3、事件模型

- 捕获阶段：事件从 window 开始向下触发，直至到达目标元素
- 目标阶段：事件达到目标元素
- 冒泡阶段：事件从目标元素开始向上冒泡，直至达到 window

##### 4、事件冒泡

##### 5、CSS 会不会阻塞渲染？为什么

- CSS 的下载和解析不会阻塞 DOM 解析，但会阻塞 DOM 渲染
- 渲染树是由 DOM Tree 和 CSSOM Tree 一起合成的

##### 6、JS 会不会阻塞渲染？为什么

- JS 的下载和解析会阻塞 GUI 渲染进程，即阻塞 DOM 和 CSS 解析和渲染
- GUI 渲染进程是解析一部分就渲染一部分，不会等待全部解析完成再渲染

##### 7、异步加载 JS 的方式？- defer/async

- defer：同步下载，等待文档解析完成才执行，在 DOMContentLoaded 之前
- async：同步下载，下载完立即执行，顺序不固定

![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/JavaScript/async-defer.png)

##### 8、event.target vs event.currentTarget

- event.target：事件触发的元素
- event.currentTarget：事件绑定的元素
