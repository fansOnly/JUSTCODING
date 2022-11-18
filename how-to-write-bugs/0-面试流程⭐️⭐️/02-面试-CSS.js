
// *************************************************** BFC 块级格式化上下文 ⭐️********************************************
// BLOCK FORMATTING CONTEXT
// 触发方式
// 1 float: left right
// 2 position: absolute fixed
// 3 display: inline-block table-cell table-caption table inline-table flex grid inline-flex inline-grid
// 3.1 table会生成匿名的table-cell, table-cell生成BFC
// 4 overflow: auto scroll hidden

// 1 边界塌陷 margin collapse
// 2 实现自适应两栏布局
// 3 清除浮动

// IFC 行内格式上下文 INLINE FORMATTING CONTEXT

// ***************************************************** 盒模型⭐️ ****************************************************
// IE怪异盒模型 box-sizing: border-box
// inner = content + padding + border
// outer = inner + margin

// W3C标准盒模型  box-sizing: content-box
// inner = content
// outer = inner + padding + border + margin

// 盒子宽度
// clientWidth = width + padping-L-R
// offsetWidth = width + padding-L-R + border-L-R
// scrollWidth = 获取指定标签内容层的真实宽度(可见区域宽度+隐藏区域宽度)

// 边界塌陷 margin collapse
// 普通文档流中元素的垂直外边距会合并

// 获取元素宽高
// dom.getBoundingClientRect()

// ***************************************************** flex布局⭐️⭐️ *************************************************

// flex - 容器属性
// 1 flex-direction: row(默认) row-reverse column column-reverse
// 2 flex-wrap: nowrap(默认) wrap wrap-reverse
// 3 flex-flow: <flex-direction> || <flex-wrap>
// 4 justify-content: flex-start(默认) flex-end center space-between space-around
// 5 align-items: flex-start flex-end center baseline(项目第一行文字的基线) stretch(默认, 占满整个容器高度)
// 6 align-content: flex-start flex-end center space-between space-around stretch(默认, 占满整个交叉轴)
// 存在多个交叉轴时起作用

// flex - 项目属性
// 1 order: <integer> 默认0, 越小越靠前
// 2 flex-grow: <number> 放大比例, 默认为 0, 空间剩余时, 默认不放大
// 3 flex-shrink: <number> 缩小比例, 默认为 1, 空间不足时, 默认全部缩小
// 4 flex-basis: <length> || 'auto', 默认 auto, 项目占据的主轴空间
// 5 flex: none | [ <flex-grow> | <flex-shrink>? || <flex-basis> ], 默认 0 1 auto, 后两个属性可选
// flex: none => 0 0 auto;
// flex: auto => 1 1 auto;
// 6 align-self: auto flex-start flex-end center baseline stretch, 默认 auto, 继承父元素 alien-items 的值, 不存在父元素时, 等同于 stretch


// ***************************************************** 布局⭐️ *********************************************************
// 1 水平布局
// inline-block+text-align
// absolute+transform (CSS3)
// flex+justify-content

// 2 垂直布局
// table-cell+vertical-align
// absolute+transform
// flex+align-items

// 3 水平垂直布局
// absolute+transform
// inline-block+text-align+table-cell+vertical-align
// flex + justify - content + align - items


// ***************************************************** css 选择器类型⭐️ *********************************************************

// id选择器
// 类选择器-class
// 标签选择器
// 相邻选择器 直接相邻h1+p  普通相邻h1～h2
// 子选择器 ul>li
// 后代选择器 div a
// 通配符选择器 *
// 属性选择器 input[name='']
// 伪类选择器 :hover
// 伪元素选择器 ::before ::after
// 分组选择器


// css 样式权重计算
// !important 10000
// 内联样式 style 1000
// id选择器 100
// class选择器 10
// 标签选择器 1

// 继承的样式权重最低
// css样式权重根据编写顺序由下往上覆盖

// ************************************************************************************************************************

{/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no"></meta> */}

// 响应式方案⭐️⭐️
// 1 插件 - BootStrap
// 2 rem em
// 3 百分比
// 4 媒体查询
// 4.1 如果是判断最小值 (min-width)，那么范围就应该从小到大写
// 4.2 如果是判断最大值(max - width) ，那么范围就应该从大到小写
// 5 vw vh
// 6 flexible.js - px 转 rem

// 类型布局宽度
// 大屏幕 >= 1200px
// 默认 >= 980px
// 平板 >= 768px
// 手机到平板之间 <= 767px
// 手机 <= 480px

// ************************************************************************************************************************

// z-index 层叠上下文
// 同父同级元素
// z-index越大, 层级越高
// z-index相同, dom流中后面的覆盖前面的
// 定位元素覆盖未定位元素

// 父子层级元素
// 不同的父元素, z-index越大, 层级越高
// 父元素z-index生效时, 子元素不论是否设置z-index, 其层级都和父元素一致, 存在父元素上方
// 父元素z-index失效时, 子元素z-index生效

// ************************************************************************************************************************

// display: none
// visibility: hidden
// opacity: 0

// 渐进增强
// 优雅降级

// ************************************************************************************************************************

// CSS 与处理器⭐️⭐️⭐️⭐️
// SCSS
// LESS
