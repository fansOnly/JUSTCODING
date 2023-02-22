#### 一、请求方法

- GET：获取指定的资源，应该只用于获取数据

  - 安全、幂等、可缓存
  - 无请求主体，有响应主体

- POST：发送数据给服务器

  - 不安全、不幂等、不可缓存
  - 有请求主体，类型由 Content-Type 指定

- GET vs POST
  - 1.GET 请求参数在 URL 上，POST 请求参数在请求体
  - 2.GET 请求参数有限制， POST 请求参数可以很长
  - 3.GET 请求参数在 URL 上，有历史记录，相对而言 POST 更安全
  - 4.浏览器刷新时 POST 会重复请求，GET 不会

---

#### 二、请求报文结构

- 一行起始行用于描述要执行的请求，或者是对应的状态，成功或失败。这个起始行总是单行的
  - 1.HTTP 方法
  - 2.请求目标 URL
  - 3.HTTP 版本
- 一个可选的 HTTP 头集合指明请求或描述消息正文
  - 1.Request headers：User-Agent，Accept-Type 等
  - 2.General headers：通用首部信息
  - 3.Entity headers：Content-Length，Content-Type 等
- 一个空行指示所有关于请求的元数据已经发送完毕
- 一个可选的包含请求相关数据的正文 (比如 HTML 表单内容), 或者响应相关的文档。 正文的大小有起始行的 HTTP 头来指定
  - 1.Single-resource bodies
  - 2.Multiple-resource bodies

---

#### 三、请求首部

- 通用首部

  - Cache-Control：HTTP 1.1
    - public: 响应头可以被任何对象缓存,包括客户端, 代理服务器
    - private: 默认值, 响应头只能被单个客户缓存, 不能被代理服务器缓存
    - no-cache: 缓存要经过服务器验证, 在使用缓存前, 会对比 ETag, 相同返回 304, 使用缓存
    - no-store: 禁用缓存
  - Connection
    - HTTP/1.1, 是否需要持久连接, 默认 keep-alive, close
  - Transfer-Encoding
    - 报文主体的传输编码格式, chunked(分块)/identity(未压缩和修改)/gzip(LZ77 压缩)/deflate(zlib 结构压缩)/compress(LZW 压缩,弃用)
  - Date

- 常用请求首部

  - Accept
    - 告知客户端可以处理的内容类型 - text/html, image/\*, \*/\*
  - If-modified-Since
    - 将 Last-Modified 传给服务器询问资源是否过期
    - If-Modified-Since: Wed, 21 Oct 2020 07:28:50 GMT
  - If-Unmodified-Since
  - If-Match
    - 将 ETag 的值发送给服务器, 询问服务器资源是否过期
    - If-None-Match: "bfc129c88ca92d82d"
  - If-None-Match
  - Range
    - 告知服务器返回文件的那一部分, 用于断点续传
  - Host
    - 指明服务器的域名(对于虚拟主机), 以及监听的端口号
    - www.baidu.com
  - User-Agents
    - 告诉服务器客户端使用的操作系统和浏览器的版本 名称等信息
    - Mozilla/\<version> (\<system-information>) \<platform> (\<platform-details>) \<extensions>

- 常用响应首部

  - Location
    - 页面重定向地址, 一般用于 3xx 的相应处理 - \<url>
  - ETag（强 / 弱）
    - 资源的版本标识, 如果没有变动, web 服务器不需要发送完整的响应
  - Server
    - 处理请求的服务器软件信息
    - \<product> - nginx/iis/tomacat/jertty

- 实体首部
  - Allow
    - 支持的 http 请求方法 - GET, POST, HEAD 等
  - Last-Modified
    - 资源最后修改时间, 判断服务器资源是否修改
  - Expired：HTTP 1.0
    - 响应过期时间 - \<http-date>
