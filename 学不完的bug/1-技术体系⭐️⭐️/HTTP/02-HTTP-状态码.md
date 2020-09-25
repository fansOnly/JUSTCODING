## HTTP 状态码

* 「1xx」：代表请求已被接收，等待下一步处理
* 「2xx」：代表响应成功
* 「3xx」：重定向状态
* 「4xx」：客户端错误
* 「5xx」：服务端错误

---

#### 1xx 信息类

* 接收的请求正在处理，信息类状态码

---

#### 2xx 成功

* 200：OK，客户端发送的请求被服务端正确处理
* 204：No content，请求成功，服务端没有资源返回
* 206：Partial Content，客户端进行了范围请求，服务端成功执行GET请求响应报文中包含由Content-Range指定范围的实体内容

---

#### 3xx 重定向

* 301：moved permanently，永久重定向，表示资源被分配到了新的URL
* 302：found，临时重定向，表示资源临时被分配了新的URL
* 303：see other，表示资源存在着另外一个URL，应使用GET方法获取资源
* 304：not modified，表示资源命中协商缓存
* 307：temporary redirect，临时重定向，同302，不会改变method

ps：301 302 303响应时，几乎所有的浏览器都会将POST改成GET，删除请求报文主体，之后请求会自动重新发送

---

#### 4xx 客户端错误

* 400：bad request，请求报文错误
* 401：unauthoried，表示发送的请求需要包含HTTP认证的信息
* 403：forbidden，请求的资源被服务器拒绝
* 404：not found，请求的资源不存在服务器
* 405：Method Not Allowed，服务器禁止使用当前请求方法
    > 客户端通过options方法查看服务器允许的访问方法
    > Acces-Control-Allow-Methods

---

#### 5xx 服务端错误

* 500：internal server error，服务端在执行请求是发生错误
* 502：Bad Gateway，服务器自身是正常的，但是访问的时候发生了错误，一般是代理错误
* 503：service unavailable，服务器暂时处理超负载或停机维护，无法处理请求
