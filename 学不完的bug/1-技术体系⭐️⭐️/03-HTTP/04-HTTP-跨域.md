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

+ HTTP 响应首部
  + 1.指定了允许访问该资源的外域 URI
    + Access-Control-Allow-Origin: \<origin> | *
  + 2.让服务器把允许浏览器访问的头放入白名单
    + Access-Control-Expose-Headers: \<field-name>[, \<field-name>]*
  + 3.指定实际请求允许使用的 HTTP 方法
    + Access-Control-Allow-Methods: \<method>[, \<method>]*
  + 4.指定预检请求的缓存时间
    + Access-Control-Max-Age: \<delta-seconds>
  + 5.指定实际请求是否允许携带 credentials
    + Access-Control-Allow-Credentials: true | false
  + 6.指定实际请求允许携带的首部字段
    + Access-Control-Allow-Headers: \<field-name>[, \<field-name>]*

+ HTTP 请求首部
  + 1.预检请求或者实际请求的源站
    + Origin: \<origin>
  + 2.实际请求使用的 HTTP 方法
    + Access-Control-Request-Method: \<method>
  + 3.实际请求携带的首部字段
    + Access-Control-Request-Headers: \<field-name>[, \<field-name>]*

+ 简单请求：同时满足以下两个条件
  + 请求方法：HEAD、GET、POST
  + 请求头
    + Accept
    + Accept-language
    + Context-language
    + Content-Type: application/x-www-form-urlencoded、mutipart/form-data、text/plain

+ 非简单请求
  + Context-Type: application/json、application/xml 等
  + 1、预检请求：询问服务器当前请求是否在服务器的许可名单中以及可以使用那哪些HTTP动词和头信息字段，请求方法是 OPTIONS，关键头信息字段是 Origin
    + 大多数浏览器不支持预检请求的重定向，应避免发生
  + 2、正常请求

##### 3、postMessage

##### 4、document.domain

##### 5、window.name

##### 6、Websocket

##### 7、nginx 反向代理

```js
// proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```
