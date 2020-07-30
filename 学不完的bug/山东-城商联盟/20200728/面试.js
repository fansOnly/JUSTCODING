// ⭐️ 在前端开发中, 如何获取浏览器的唯一标识  指纹信息

// 根据canvas获取浏览器指纹信息
// 1 绘制canvas, 获取base64的dataurl
// 2 对dataurl的字符串进行md5摘要计算, 得到指纹信息
// fingerprintjs




// ⭐️ 在服务端应用获取客户端的ip

// 1 x-forwarded-for 请求头中的第一个ip
// <client>, <proxy1>, <proxy2>
// 2 否则取建立连接socket的remoteAddr



// ⭐️ 如何全部替代一个子串为另一个子串
// 1 split().join()
// 2 replaceAll()
// 3 使用正则在遇到某些特殊字符的时候会出错




// ⭐️ CORS 指定多个域名
// 1 请求头 Origin
// a 存在跨域, 带上 Origin, 值为当前域名
// b 不跨域, 不带 Origin

// 2 Vary: Origin
// 为不同的Origin缓存不同的资源, 避免缓存破坏CORS设置


// ⭐️ 如何避免为PC端缓存移动端页面
// Very: User-Agent



// 实现表格斑马纹
// :nth-child(2n) :nth-child(even)
// :nth-child(2n+1) :nth-child(odd)




// ⭐️ 选择器权重
// 1 id选择器 #id
// 2 class .class 属性选择器 [type="radio"] 伪类选择器 :hover
// 3 标签选择器 p 伪元素选择器 ::before
// 4 通配符选择器 * 组合选择器 + ～ > 否定伪类选择器 :not() 对优先级无影响



// 如何在浏览器中监听剪切板的内容
// 1 Clipboard Api
// const result = await navigator.permissions.query({name: 'clipboard-read'}) // granted prompt
// const text = await navigator.clipboard.readText()



// ⭐️ 如何把json转化为json.demo并下载
// 1 转化为DataURL text -> DataURL
// 2 转化为ObjectURL tetx -> Blob -> ObjectURL
// const str = JSON.stringify(json, null, 2)
// const text1 = `data:,${str}`
// const text2 = URl.createObjectURL(new Blob(str.split('')))




// ⭐️ try{}里面有return,finally里的代码会不会执行,什么时候被执行?
// 1 不论有无异常, finally里面的代码都会执行
// 2 不论try catch 是否retunr, finally的代码都会执行
// 3 try catch 里面的值是先于finally确定并保存起来的, finally中的代码不会改变保存的值, 在finally执行完毕后再返回
// 4 如果 finally return, 程序会提前退出, 返回的值不是try catch中的值




// 事件循环
// 1 宏任务  宿主发起的任务
// 2 微任务 js引擎发起的任务



// JavaScript类型：关于类型，有哪些你不知道的细节？
// 1 undefined null
console.log(typeof void 0) // undefined

// 2 浮点数 0.1 + 0.2 == 0.3
// Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSION

// parseInt(string, radix = 10)
console.log(parseInt(12.2))
console.log(parseInt(12.2, 10))
// console.log(parseInt('0123'))


// 3 ⭐️ 类型转换
// a 装箱转换 基本类型转换为对应的对象类型
var symbolObj = Object(Symbol('a'))
console.log(typeof symbolObj) // object
console.log(Object.prototype.toString.call(symbolObj)) // [object Symbol]
console.log(symbolObj instanceof Symbol) // true
console.log(symbolObj.constructor) // Symbol

// b 拆箱转换 ToPrimitive
// 对象到基本类型 valueOf toString
// a 转换为string  toString -> valueOf -> TypeError
// b 转换为number  valueOf -> toString -> TypeError

