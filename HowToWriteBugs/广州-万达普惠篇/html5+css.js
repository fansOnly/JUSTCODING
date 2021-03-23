// ==========================================================================================
// ======================================== HTML5 ===========================================
// ==========================================================================================


// ======================================= HTML5 新特性 =======================================

// 1 标签: 
// a 语义化标签 <aside> <menu> <header> <footer> <nav> <main> <section> 等
// b 多媒体标签: <video> <audio>

// 2 属性: 
// a 增强 input 表单 type 属性, number 
// b meta 增加 charset 设置字符集
// c script 标签新增 async 以异步加载脚本

// 3 存储: 
// a 增加 localStorage sessionStorage indexdDB
// b 引入 application cache 增加对 web 和引用进行缓存

// 4 API: 
// a 拖放 API: Drag Event
// b 地理定位: navigator.geolocation?.getCurrentPosition()
// c svg 绘图
// d canvas 绘图
// e Web Worker
// f WebSocket


// ======================================= doctype =======================================

// 1 声明文档类型, 告知浏览器用什么文档标准解析当前文档
// a 怪异模式: 未声明时的默认值
// b 标准模式: 按照 W3C 的标准解析文档


// ======================================= 前端存储 =======================================

// 1 cooie: 
// a 本地存储, 4k, 兼容性好
// b 紧跟域名, HTTP 请求头会自动带上, 不管需不需要
// c 安全性低, 有可能被用户非法获取
// d httponly 为 false 时可以被 js 直接获取

// 2 Web Storage: 不参与服务端通信
// a localStorage: HTML5, 本地存储, 5M, 持久性存储, 不随页面关闭而清除
// b sessionStorage: HTML5, 会话级别的存储, 页面关闭即清除, 不同的标签页之间不能共享

// 3 indexdDB: NoSQL 型数据库, 非关系型数据库, 类似 MongoDB, 键值对存储, 异步操作, 支持事务, 250M及以上(理论无上限), 受浏览器同源策略限制

// 4 Web SQL: 在浏览器上模拟的关系型数据库, 可以通过操作 SQL 语句来操作 Web SQL, 是浏览器外的一套独立的规范, 兼容性差


// ======================================= href VS src =======================================

// 1 href: hyperReference, 超文本引用,
// a 当浏览器遇到 href 时, 会并行的下载资源, 不会阻塞页面解析
// b css 文件的引入建议使用 link 标签 而不是 @important

// 2 src: resource, 资源
// a 当浏览器遇到 src 时, 会停止解析页面, 等到资源下载或执行完毕后继续进行页面解析
// b script 标签一般都放在页面底部


// ======================================= http meta =======================================

// 1 charset: 设置文档字符集
// a charset="UTF-8"

// 2 http-equiv: 模拟 HTTP 请求头, 设置时间, 缓存, 刷新等
// a http-equiv="content-type" content="text/html; charset=utf-8"  请求内容编码
// b http-equiv="progma" content="no-cache"  HTTP/1.0  设置缓存
// c http-equiv="expires" content="0" / content="Wed, 20 Jun 2019 22:33:00 GMT" HTTP/1.1  设置缓存
// e http-equiv="cache-control" content="no-cache"  HTTP/1.1  设置缓存
// f http-equiv="refresh" content="10" / content="10;url=http://www.baidu.com"  刷新 / 跳转
// g http-equiv="X-UA-Compatible" content="IE-edge" / ....  浏览器版本
// h http-equiv="set-cookie" content=""  设置 cookie

// 3 viewport: 视口, 用于控制页面比例和缩放
// a width/height: 宽高, 宽度默认980px
// b initial-scale: 初始缩放比例, 1 ~ 10
// c maximum-scale/minimum-scale: 允许用户缩放的最大/小比例
// d user-scalable: 用户是否可以缩放, yes/no



// ==========================================================================================
// ========================================= CSS ============================================
// ==========================================================================================


// ======================================= BFC =======================================

// 1 Block Formatting Context
// a 块级格式上下文, 页面上的一个隔离的独立容器, 不受外界干扰或干扰外界

// 2 如何触发 BFC
// a float: 不为 none
// b overflow: 不为 visible
// c position: fixed  absolute
// d display: inline-block  table-cell  table-caption  grid

// 3 BFC 的渲染规则
// a 页面上的独立容器
// b 计算 BFC 的高度时, 浮动子元素也会参与计算(避免高度塌陷)
// c BFC 内部的元素在垂直方向上放置
// d BFC 的区域不会与 float 元素的预取重叠
// e BFC 内部两个相邻元素的 margin 值会重叠

// 4 BFC 的引用场景
// a 清除浮动: 避免高度塌陷
// b 避免某元素被浮动元素覆盖: 
// c 阻止外边距重叠: 不同 BFC 的 margin 不会发生重叠


// ======================================= 清除浮动 =======================================

// 1 新增 div 清除
// a <div style="clear:both"></div>

// 2 伪元素
// a <div class="clearfix"></div>
// .clearfix::after {
//     content: "";
//     display: block;
//     height: 0;
//     clear: both;
// }

// 3 触发父级元素 BFC
// .parent {
//     overflow: hidden;
//     float: left;
//     position: absolute;
//     display: inline-block;
// }