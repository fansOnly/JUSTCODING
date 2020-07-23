// dom tree - css tree - render tree - paint
// 浏览器从左上角到右下角渲染
// 第一次打开页面至少会触发一次回流和重绘

// reflow  repaint
// 页面结构的变动会触发回流
// 页面样式的变动触发重绘

// 通过class或者cssText一次性更新样式
// 离线模式： 克隆dom，操作完成后与真是dom交换
// 避免频繁直接访问计算后的样式，可以通过变量保存
// 绝对布局的dom，不会造成大量的reflow
// p标签不能嵌套太深，不要超过6层



// 从 url 输入到页面加载w显示完成
// dns域名解析，获取真实ip，向服务器发起请求
// 服务器返回数据，浏览器加载文件（html css js img 等）
// 浏览器对资源进行语法解析，建立相应的内部结构（dom tree 等）
// 载入解析到的资源文件，渲染页面



// e.stopPropagation()
// e.preventDefault()


// localStorage sessionStorage Cookie
// 保存在浏览器端, 同源
// localStorage sessionStorage 保存在浏览器, 不参与服务端通信 大小 5M
// 生命周期：localStorage 永久保存, sessionStorage 保存在当前回话， 均可手动清除
// 作用域：不同浏览器不共享localStorage 和 sessionStorage, 不同会话不共享 sessionStorage

// Cookie：存储在硬盘, 过期前一直有效, 存在安全问题, 4K大小，数量也有限制, 20个左右


// 浏览器事件循环
// 事件捕获：从 window 开始向下触发, 直至到达目标元素
// 目标阶段：事件传播至目标元素
// 事件冒泡：事件从目标元素向上冒泡, 直至到达 window
