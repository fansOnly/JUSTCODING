function makeIteratorObj(obj) {
  let index = 0
  const len = Object.keys(obj).length
  return {
    next() {
      if (index < len) {
        return {
          value: Object.values(obj)[index++],
          done: false
        }
      } else {
        return {
          value: undefined,
          done: true
        }
      }
    },
    [Symbol.iterator]() {
      return this
    }
  }
}

const obj = makeIteratorObj({ a: 1, b: 2, c: 'c' })

// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())

for (const item of obj) {
  console.log(item)
}



/**
 * tcp
 * 1. 面向连接
 * 2. 可靠传输
 * 3. 一对一
 * 4. 面向字节流
 * 5. 拥塞机制
 * 6. 有状态
 * 7. 有序
 * 
 * udp
 * 1. 不可靠
 * 2. 无序
 * 3. 不可靠
 * 4. 面向数据报
 * 6. 无拥塞机制 
 * 7. 一对一、一对多
 */



/**
 * http2
 * 1. 基于 https
 * 2. 头部压缩
 * 3. 二进制传输，数据包 - 帧
 * 4. 多路复用
 * 5. 服务器推送
 * 
 * 共用一个 TCP 链接，TCP 丢包后所有的 http 请求都会被阻塞
 */



/**
 * 通用首部
 * 1. Date
 * 2. Connection
 * 3. Cache-control
 * 4. Transfer-encoding
 * 
 * 请求首部
 * 1. Host
 * 2. Accept / Accept-Charset / Accept-Language / Accept-Encoding
 * 3. If-Match / If-None-Match
 * 4. If-Modified-SInce / If-Unmodified-Since
 * 5. Range
 * 6. User Agent
 * 
 * 响应首部
 * 1. Server
 * 2. Location
 * 3. ETag
 * 4. Accept-Range
 * 
 * 实体首部
 * 1. Allow
 * 2. Expires
 * 3. Last-Modified
 * 4. Content-Type / Content-Language / Content-Encoding / Content-Length
 */



 var myIterable = {};
 myIterable[Symbol.iterator] = function* () {
     yield 1;
     yield 2;
     yield 3;
 };

 for (const value of myIterable) {
  console.log('value: ', value);
 }
