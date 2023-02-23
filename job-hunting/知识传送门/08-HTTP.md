### HTTP 知识

<hr style="height:0px;border:none;border-top:2px solid #d8d8d8;" />

##### 1、HTTP 状态码

- 1xx
  - 100 - 服务器响应成功，等待下一步处理
- 2xx
  - 200 - 请求成功 / 跨域预检响应
  - 204 没有资源返回
  - 206 - 范围请求
- 3xx
  - 301 - 永久重定向
  - 302 - 临时重定向
  - 304 - 协商缓存生效
- 4xx
  - 400 - 前端请求错误，参数、方法不对等
  - 401 - 需要 HTTP 认证信息
  - 403 - 客户端权限不足
  - 404 - 请求地址不存在
- 5xx
  - 500 - 服务端错误
  - 502 - 服务器网关错误
  - 503 - 服务器超载或停用

##### 2、请求报文的组成

- 请求行 - GET /index.html HTTP/1.1
- 请求头
  - User-Agent
  - Accept
  - Host
  - Content-Type
    - application/x-www-form-urlencoded
    - application/json
    - multipart/form-data
    - text/xml
- 空行 - 告诉浏览器请求头到此结束
- 请求体

##### 3、HTTP 首部

- 通用首部
  - Cache-Control
  - Connection
  - Transfer-Encoding
  - Date
- 实体首部
  - Content-Type
  - Allow
  - Last-Modified
  - Expires
- 请求首部
  - Accept
  - If-Modified-Since
  - If-UnModified-Since
  - If-None-Match
  - If-Match
  - Host
  - Range
  - User-Agent
- 响应首部
  - Location
  - ETag
  - Server

##### 2、OSI 七层网络模型

![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/HTTP/OSI-%E4%B8%83%E5%B1%82%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%9E%8B.jpg)

##### 2、HTTP 版本

- HTTP 0.9
  - 只支持 get 请求
  - 只响应 HTML 文档
- HTTP 1.0
  - 增加 Header
  - 多种状态码
  - 多种文档类型
- HTTP 1.1
  - 默认长连接
  - 新增 Cache-Control、ETag 缓存配置
  - 新增 Range 头域，支持断点续传
  - 请求必须携带 Host 头
- HTTP 2.0
  - 多路复用，并行发送请求，解决了 HTTP 层队头阻塞问题
  - 首部压缩
  - 二进制传输
  - 服务端推送
- HTTP 3.0
  - UDP 协议 - QUIC - 谷歌 - 解决了 TCP 层队头阻塞问题
  - 多路复用
  - 0-RTT 建立连接
  - TLS 加密
  - 流量控制，拥塞控制
  - 丢包重传

##### 4、队头阻塞

- HTTP 队头阻塞
  - 客户端收到上一个 HTTP 请求的响应，才能发送下一个请求
- TCP 队头阻塞
  - 数据包有序传输，中间任何一个数据包丢失，都需要等待重传，阻塞后面的数据包

##### 5、TCP vs UDP ⭐️⭐️

|              | TCP                            | UDP                            |
| ------------ | ------------------------------ | ------------------------------ |
| 是否连接     | 面向连接                       | 无连接                         |
| 是否可靠     | 可靠传输，流量控制和拥塞控制   | 不可靠传输                     |
| 连接对象个数 | 一对一                         | 一对一、一对多、多对一、多对多 |
| 传输方式     | 面向字节流                     | 面向报文                       |
| 首部开销     | 最小 20 字节，最大 60 字节     | 8 字节                         |
| 使用场景     | 稳定场景：文件传输、网页请求等 | 实时传输场景：视频、直播等     |

##### 6、HTTPS ⭐️⭐️⭐️

- IP -> TCP -> SSL -> HTTP
- SSL -> TSL
- 443
- 9 次握手
- 加密算法
  - 对称加密
  - 非对称加密
  - 混合加密
  - 摘要算法

##### 7、三次握手 & 四次挥手 ⭐️⭐️⭐️

![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/HTTP/http-connect.jpg)

##### 8、DNS 相关 ⭐️⭐️⭐️

- 递归查询
- 迭代查询
- [文档](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/HTTP/DNS-%E8%A7%A3%E6%9E%90.md)

![Alt text](../%E9%9D%A2%E8%AF%95%E8%BE%85%E5%8A%A9%E5%8C%85/HTTP/DNS%E8%A7%A3%E6%9E%90.jpg)

##### 9、GET vs POST

|          | POST                                                   | GET                                         |
| -------- | ------------------------------------------------------ | ------------------------------------------- |
| 安全性   | 通过 body 发送数据                                     | 参数暴露在 URL 中                           |
| 参数长度 | 一般没有限制                                           | 受限于浏览器对 URL 长度的限制，一般 2K 左右 |
| 参数类型 | 没有限制                                               | ASCII 字符                                  |
| 参数编码 | application/x-www-form-urlencoded、multipart/form-data | application/x-www-form-urlencoded           |
| 缓存     | 默认没有缓存                                           | 默认缓存                                    |
| 幂等性   | 无                                                     | 幂等                                        |
