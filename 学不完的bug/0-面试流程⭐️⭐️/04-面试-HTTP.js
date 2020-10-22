// ============================================ HTTP 主要特点⭐️ ============================================
// 特点：无状态  无连接  媒体独立 明文传输 可靠传输
// 缺点：无状态 明文传输 队头阻塞

// ============================================ 网络 OSI 七层协议⭐️ ============================================

// 1 物理层 - 网络连接介质：网线，光缆等，传输的是 bit
// 2 数据链路层 - 以太网：将 bit 转换为帧传输
// 3 网络层 - IP 协议：定义 IP 地址，定义路由，实现主机到主机之间的连接，传输的是数据包
// 4 传输层 - TCP/UDP 协议：建立端口到端口的通信，传输的是数据段
// 5 会话层 - 管理会话连接：建立连接，断开连接，连接时长，数据传输等
// 6 表示层 - 设备的数据格式与网络标准数据格式之间的转换：压缩，加密等
// 7 应用层 - 针对特定应用的协议：电子请求协议 E-mail，远程登陆协议 SSH，文件传输协议 FTP，网络请求协议 HTTP 等

// ============================================ HTTP 状态码⭐️ ===================================================

// 1xx - 

// 1 2xx
// a 200 - 请求成功
// b 201
// c 202
// d 204 

// 2 3xx
// a 301 - Moved Permanently: 永久重定向：请求的网页永久移动到新位置，自动将请求者转到新位置
// b 302 - Found: 临时重定向：请求的网页临时移动到新位置，后续的请求仍然从原来的位置发起
// c 304 - Not Modified: 请求的内容未修改，此时不会返回内容，命中协商缓存

// 3 4xx - 前端请求错误
// a 400 - Bad Request: 错误请求：客户端传参不对等
// b 401 - Unauthorized: 需要HTTP认证信息
// c 403 - Forbidden: 客户端权限不足
// d 404 - Not Found: 请求的地址不存在

// 5xx - 服务端错误
// a 500 - Inter Serber Error: 服务器内部错误，无法完成请求
// b 501 - Not Implemented: 尚未实施，服务器不具备完成请求的功能
// c 502 - Bad Gateway：上游服务器相应错误，服务器网关错误
// d 503 - Service Unavailable: 服务不可用，如服务器超载或者停机维护，通常是暂时状态

// =============================================== HTTP缓存⭐️⭐️ ===============================================

// 浏览器会把一份请求过的资源拷贝一份存储起来，当下次需要使用该资源时, 根据浏览器的缓存机制决定是使用存储的资源还是发起新的请求

// from memory cache
// from disk cache
// 资源本身大小数值

// 优先级
// 强制缓存 > 协商缓存
// cache-control(1.1) > Expires(1.0) > Etag > last-modified
// Etag 比对文件内容
// last-modified 比对文件修改时间，秒级

// =============================================== 跨域⭐️⭐️⭐️ ======================================================

// 一个域下的文档或者脚本去请求另一个域下的资源
// 不同域名 不同端口 不同协议
// 协议（protocol）, 主机（host）和端口号（port）

// 同源策略
// 防止 XSS CSFR 攻击等

// 解决方案
// 1 jsonp - 利用 script 标签的异步加载实现的
// 2 跨域资源共享 CORS - Access-Control-Allow-Origin: <origin> | * / 携带cookie - Access-Control-Allow-Credentials: true
// a proxy
// 3 服务器代理 nginx
// 4 postMessage
// 5 Websocket
// 6 Hash（window.location.hash + iframe）

// 预检请求 - 复杂请求
// 使用OPTIONS方法向服务器发起请求, 以获知服务器是否允许该实际请求

// ========================================== GET 和 POST 的区别 ======================================

// 1 GET 请求参数在 URL 上，POST 请求参数在请求体
// 2 GET 请求参数有限制， POST 请求参数可以很长
// 3 GET 请求参数在 URL 上，有历史记录，相对而言 POST 更安全
// 4 GET 请求可以缓存， POST 不能
// 5 GET 请求是幂等性的，POST 不是 ⭐
// 5.1 幂等性：用户对统一操作发起的一次请求或者多次请求的结果是一致的
// ps 在网络不好的环境，GET 请求会重复尝试，会有重复操作数据的风险

// ========================================== 请求报文的组成 ============================================

// 1 请求行 - request line: GET /index.html HTTP/1.1
// 2 请求头 - Header: User-Agent 、 Accept 、 Host 、 Content-Type
// 2.1 application/x-www-form-urlencoded 、 application/json 、 multipart/form-data 、 text/xml
// 3 空行 - 告诉浏览器请求头到此结束
// 4 请求数据 - body

// ========================================== 请求头和响应头 ============================================

// 1 通用头首部

// a Cache-Control: 缓存
// a-1 public: 响应头可以被任何对象缓存,包括客户端, 代理服务器
// a-2 pravite: 默认值, 响应头只能被单个客户缓存, 不能被代理服务器缓存
// a-3 no-cache: 缓存要经过服务器验证, 在使用缓存前, 会对比 ETag, 相同返回 304, 使用缓存
// a-4 no-store: 禁用缓存

// b Connection: HTTP/1.1, 是否需要持久连接, 默认keep-alive, close
// c Transfer-Encoding: 报文主体的传输编码格式, chunked(分块)/identity(未压缩和修改)/gzip(LZ77压缩)/deflate(zlib结构压缩)/compress(LZW压缩,弃用)

// 2 请求头首部

// a Accept: 告知客户端可以处理的内容类型 - text/html, image/*, */*
// b If-Modified-Since: 将 Last-Modefied 传给服务器询问资源是否过期 - If-Modefied-Since: Wed, 21 Oct 2020 07:28:50 GMT
// c If-Unmodified-Since: 同上
// d If-None-Match: 将 ETag 的值发送给服务器, 询问服务器资源是否过期 - If-None-Match: "bfc129c88ca92d82d"
// e If-Match: 同上
// f Range: 告知服务器返回文件的那一部分, 用于断点续传
// g Host: 指明服务器的域名(对于虚拟主机), 以及监听的端口号 - www.baidu.com
// h User-Agent: 告诉服务器客户端使用的操作系统和浏览器的版本 名称等信息 - Mozilla/<version> (<system-information>) <platform> (<platform-details>) <extensions>

// 3 响应头首部

// a Location: 页面重定向地址, 一般用于 3xx 的相应处理 - <url>
// b ETag: 资源的版本标识, 如果没有变动, web 服务器不需要发送完整的响应
// c Server: 处理请求的服务器软件信息 - <product> - nginx/iis/tomacat/jertty

// 4 实体头首部

// a Allow: 支持的 http 请求方法 - GET, POST, HEAD
// b Last-Modified: 资源最后修改时间, 判断服务器资源是否修改
// c Expired: 响应过期时间 - <http-date>

// ===================================== HTTP 1.0 VS 1.1 ============================================

// 1 长连接: HTTP/1.1 支持长连接, 每次 TCP 请求可以传送多个 HTTP 连接(串联方式), 最多支持 6 个 TCP 连接 ⭐
// 2 缓存处理: HTTP/1.1 新增 Entity tag, If-Unmodefied-Since, If-Match, If-None-Match 等请求头控制缓存
// 3 带宽优化及网络连接的优化: HTTP/1.1 新增 range 头域, 支持断点续传
// 4 Host 头处理: 
// a HTTP/1.0 认为每台服务器都有唯一的 IP 地址
// b HTTP/1.1 请求头必须携带 Host 头信息,不然会返回 400
// ps 虚拟主机技术可以实现多台主机可以共享一个 IP 地址

// ==================================== HTTP 2.0 的特性和优化 ============================================

// 1 新特性

// a 多路复用: 多个请求会通过一个 TCP 连接并发的完成(只支持一个 TCP 长连接)
// a-1 多个请求并行, 非阻塞
// a-2 原理: HTTP/2 引入二进制分帧层, 客户端和服务端进行传输时, 数据经过分帧层处理, 转化成一个带有请求 ID 的帧, 这些帧在传输完成后再根据ID 组合成对应的数据

// b 服务端推送: 服务端可以主动推送资源到客户端
// c 新的二进制格式: HTTP/2 采用二进制格式传输数据, 具有更好的解析性和拓展性 VS HTTP/1.1 采用文本格式
// d header 压缩: 压缩消息头, 减少了传输数据的大小


// 2 优化

// a TCP启动慢: TCP 连接建立后, 会经历一个先慢后快的过程, 对于性能有损耗, 这是 TCP 为了减少网络阻塞的一个策略, 暂时无法优化
// b 多个 TCP 连接竞争宽带: 多个 TCP 连接在带宽不足时会竞争宽带, 影响关键资源的下载
// c HTTP/1.1 队头阻塞: HTTP/1.1 长连接在同一时刻只能处理一个请求, 当前请求未结束时, 其他请求均处于阻塞状态

// ============================== HTTP 3.0 ==============================

// 1 UDP 协议
// 2 多路复用
// 3 0-RTT
// 4 TLS 加密
// 5 流量控制
// 6 丢包重传

// ============================== HTTP VS HTTPS ==============================

// 1 HTTP 使用80 端口, HTTPS 使用 443 端口
// 2 HTTPS 需要申请证书
// 3 HTTP 是超文本语言传输, 明文传输, HTTPS 是经过 SSL 加密的协议, 更安全
// 4 HTTPS 比 HTTP 更慢, 除了 TCP 握手的三个包, 还要加上 SSL 握手的九个包

// ============================== HTTPS 加密 ==============================

// 1 对称加密
// 2 非对称加密
// 3 第三方认证
// 4 数字签名
