var foo = function(...args) {
  // 要求实现函数体
  let fn = (...args2) => {
    return foo.apply(null, [...args, ...args2])
  }
  fn.getValue = () => args.reduce((a, b) => a + b)
  return fn
}
var f1 = foo(1,2,3);
console.log(f1.getValue()) // 6 输出是参数的和
var f2 = foo(1)(2,3);
console.log(f2.getValue()) // 6
var f3 = foo(1)(2)(3)(4);
console.log(f3.getValue()); // 10



/**
 * 异步求和函数
 */
async function syncAdd(...args) {
  const promises = [...args].map(val => Promise.resolve(val))
   return await Promise.all(promises).then(res => {
    return res.reduce((a, b) => a + b)
  })
}

console.log(await syncAdd(1, 2, 3, 4));



/***
 * 正则
 */
function fn1(val) {
  return /\/\/www\.qq\.com[^.]*$/.test(val)
}

console.log(fn1('http://www.qq.com'))
console.log(fn1('http://www.qq.com/a'))
console.log(fn1('http://www.qq.com.cn'))
console.log(fn1('http://www.qq1.com'))


/**
 * 数据扁平化 - 栈结构
 */
const flat = arr => {
  let result = []
  let stack = [...arr]
  while (stack.length) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      stack.push(...val)
    } else {
      result.unshift(val)
    }
  }
  return result
}

console.log(flat([1,2,2,[3, [56]],3,[4,[6,[8,[0]]]]]))

var str = '11'
console.log(str.padStart(5, '0'))
console.log(str.padEnd(5, '0'))



/**
 * 拆解URL中的参数
 */
const queryString = url => {
  let obj = {}
  url.replace(/([^?&=]+)=([^&#]+)/g, (_, k, v) => obj[k] = v)
  return obj
}
let url = 'http://sample.com/?a=1&b=2&c=xx&d=2#hash'
console.log(queryString(url))

// 利用 URL
const queryString2 = url => {
  let query = new URL(url)
  return Object.fromEntries(query.searchParams)
}
console.log(queryString2(url))
