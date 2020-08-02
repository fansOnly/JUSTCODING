


// 为什么操作 dom 慢
// dom 本身是一个js对象, 操作本身并不慢, 触发浏览器的回流和重绘等使其变慢



// 阻塞渲染
// 加载js文件
// 部分js的执行需要一依赖css, 可能会阻塞页面的渲染


// 如何判断js运行环境
// 浏览器 window
// nodejs global
// worker self



// cookie属性
// name cookie的名称
// value cookie的值
// domain 使用cookie的域名
// path 使用cookie的路径
// expires/max-age cookie过期时间
// Size cookie大小
// httpOnly true时只能通过请求头携带, 不允许通过document.cookie 获取
// secure 是否只能通过https协议发送
// sameSite Strict lax-默认 None 防止CSFR攻击



// cookie一般是由后端设置, 通过response流发送给前端, 并设置过期时间, 在过期之前, cookie会一直存在浏览器中, 并且每次发送http请求都会携带在http请求头中
