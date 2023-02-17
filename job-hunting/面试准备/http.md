##### 一、HTTP 缓存

1. 强缓存
    + Expires
    + Cache-Control

2. 协商缓存
    + Last-Modified
    + ETag

-----

##### 二、DNS 解析

1. 浏览器缓存
2. 本机缓存
3. 向本地域名服务器发起递归查询

4. 本地域名服务器使用迭代查询
5. 根域名服务器
6. 顶级域名服务器
7. 权限域名服务器
8. 返回结果

-----

##### 三、HTTP 连接

1. 连接三次握手
    + Client(CLOSED -> SYN_SEND) -> SYN = 1 -> Server
    + Server(CLOSED -> SYN_RCVD) -> SYN = 1 & ACK = 1 -> Client
    + Client(ESTABLISHED) -> ACK = 1 -> Server(ESTABLISHED)

2. 断开四次挥手
    + Client(->FIN_WAIT_1) -> FIN = 1 -> Server
    + Server(-> CLOSE_WAIT) -> ACK = 1 -> Client(->FIN_WAIT_2)
    + Server(->LAST_ACK) -> FIN = 1 -> Client(->TIME_WAIT=2msl)
    + Client(->CLOSED) -> ACK = 1 -> Server

-----

##### 四、HTTP 首部

1. 通用首部
    + Cache-Control

2. 请求首部
    + Host
    + Accept
    + User-Agent
    + If-Match / If-None-Match / If-Modified-Since / If-Unmodified-Since

3. 响应首部
    + Server
    + ETag
    + Location

4. 实体首部
    + Content-Type
    + Allow
    + Expires
    + Last-Modified

-----

##### 五、HTTP 状态码

1. 1xx
    + 100 接受成功

2. 2xx
    + 200 响应成功 / 跨域预检响应
    + 204 没有资源返回
    + 206 范围请求

3. 3xx
    + 301 永久重定向
    + 302 临时重定向
    + 304 命中协商缓存

4. 4xx
    + 400 请求报文语法错误
    + 401 需要认证
    + 403 需要授权
    + 404 请求地址不存在

5. 5xx
    + 500 服务端执行请求错误
    + 502 服务器代理错误
    + 503 服务器超载/停机
