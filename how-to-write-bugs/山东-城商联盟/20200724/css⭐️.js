// css 样式权重计算
// !important 10000
// 内联样式 style 1000
// id选择器 100
// class选择器 10
// 标签选择器 1

// 继承的样式权重最低
// css样式权重根据编写顺序由下往上覆盖



// css 选择器类型
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



// 盒模型
// IE怪异盒模型 box-sizing: border-box
// inner = content + padding + border
// outer = inner + margin

// W#C标准盒模型  box-sizing: content-box
// inner = content
// outer = inner + padding + border + margin



// 盒子宽度
// clientWidth = width + padping-L-R
// offsetWidth = width + padding-L-R + border-L-R
// scrollWidth = 获取指定标签内容层的真实宽度(可见区域宽度+隐藏区域宽度)



// 边界塌陷 margin collapse
// 普通文档流中元素的垂直外边距会合并




// BFC 块级格式化上下文 BLOCK FORMATTING CONTEXT
// 根元素 html
// float left right
// position absolute fixed
// display inline-block table-cell table-caption table inline-table flex grid inline-flex inline-grid
// overflow auto scroll hidden

// ps table会生成匿名的table-cell, table-cell生成BFC



// IFC 行内格式上下文 INLINE FORMATTING CONTEXT



// z-index 层叠上下文
// 同父同级元素
// z-index越大, 层级越高
// z-index相同, dom流中后面的覆盖前面的
// 定位元素覆盖未定位元素

// 父子层级元素
// 不同的父元素, z-index越大, 层级越高
// 父元素z-index生效时, 子元素不论是否设置z-index, 其层级都和父元素一致, 存在父元素上方
// 父元素z-index失效时, 子元素z-index生效



// display: none
// visibility: hidden


// 前端性能优化 ⭐️
// 1 减少http请求 雪碧图 css合并压缩  js合并压缩 base64
// 2 http缓存
// 3 请求资源gzip压缩
// 4 ssr + 骨架屏
// 5 头部css 底部js
// 6 懒加载
// 7 webpack打包优化
// 8 cdn镜像





// 渐进增强
// 优雅降级
