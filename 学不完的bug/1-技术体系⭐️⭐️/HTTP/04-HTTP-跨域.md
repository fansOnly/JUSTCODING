#### 一、什么是跨域

+ 跨域是浏览器的同源策略造成的，浏览器不能执行其他网站的脚本

---

#### 二、同源策略

+ 默认情况下，Web 应用程序只能从加载应用程序的同一个域请求的HTTP资源
+ 协议、域名、端口三者必须全部相同
+ 同源限制
  + Cookie、LocalStorage、IndexDB 等存储性内容
  + 无法跨域操作 DOM 节点（iframe）
  + Js 发起的 Ajax 请求等
+ 三个不受限制的标签
  + img
  + link
  + script

---

#### 三、解决方案

##### 1、Jsonp

+ 利用 script 标签不受跨域限制来实现
+ 只支持 get 方法
+ 1、创建 script 标签，将原有的 url 地址、回调函数名和参数等设置为 script 标签的 src
+ 2、服务端响应时要将数据设置为指定的格式，函数名拼接参数的 json 字符串
+ 3、在客户端定义应的函数，改函数的形参即为服务端响应的数据

##### 2、CORS

+ 跨域资源共享，IE10+，需要浏览器和服务端同时设置
+ 客户端请求：
  + 携带 Cookie: withCredentials: true
+ 服务端响应：
  + Access-Control-Allow-Origin: * / 指定域名
  + 携带 Cookie: Access-Control-Allow-Credentials: true
+ 简单请求：同时满足以下两个条件
  + 请求方法：HEAD、GET、POST
  + 请求头
    + Accept
    + Accept-language
    + Context-language
    + Last-Event-ID
    + Content-Type: application/x-www-form-urlencoded、mutipart/form-data、text/plain
+ 非简单请求
  + 1、预检请求：询问服务器当前请求是否在服务器的许可名单中以及可以使用那哪些HTTP动词和头信息字段，请求方法是 OPTIONS，关键头信息字段是 Origin
    + Context-Type: application/json
  + 2、正常请求

##### 3、postMessage

##### 4、document.domain

##### 5、window.name

##### 6、Websocket

##### 7、nginx 代理
