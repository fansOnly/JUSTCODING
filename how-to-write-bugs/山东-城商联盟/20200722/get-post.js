// get 和 post 的区别


// get
// 1 请求可被缓存
// 2 参数保留在浏览器历史记录
// 3 请求可被收藏为书签
// 4 请求有长度限制 url最大长度为2048
// 5 数据类型只能是ASCII字符
// 6 安全性较差
// 7 编码类型 application/x-www-form-urlencoded
// ⭐️get请求会把header和data一起发送出去, 服务器相应200


// post
// 1 请求不能被缓存
// 2 参数不会保留在浏览器历史记录
// 3 请求不能被收藏为书签
// 4 请求大小无限制
// 5 无限制 允许二进制数据
// 6 安全性相对get高
// 7 编码类型 application/x-www-form-urlencoded multipart/form-data
// ⭐️ post请求会先发送header, 服务器相应100 continue, 浏览器在发送data, 服务器相应200






// 
// get产生一个TCp数据包, post产生两个TCP数据包(firefox只发一次)
