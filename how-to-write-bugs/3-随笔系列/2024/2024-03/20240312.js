/**
 * 跨域
 * 
 * jsonp
 * cors
 * postmessage
 * websoket
 * 
 * 
 * 不受跨域影响
 * script 标签
 * link 标签
 * img 标签
 * 
 * 
 * 
 * 
 * 
 * 工程化
 * 
 * bundle vs bundleless
 * 
 * webpack - 传统打包方式
 * 1. 收集依赖 》 打包
 * 
 * vite - “现代”打包方式
 * 1. 浏览器 import 动态引入 js，不用打包
 * 2. esbuild 解析。使用 Go 开发！
 * 
 * 
 * 闭包的应用场景
 * 1. 延伸变量作用域
 * 2. 函数节流和防抖的实现
 * 3. 函数缓存
 * 4. 
 */


/**
 * 数组分割
 */
{
  function convertArray(arr, size) {
    const res = []
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size))
    }
    return res
  }

  const arr = [1,2,3,4,5,6,7,8,9, 0]

  console.log(convertArray(arr, 3))
}



/**
 * 正则数组打平
 */
{
  function flatArray(arr=[]) {
    return JSON.parse('[' + (JSON.stringify(arr).replace(/[\[|\]]/g, '')) + ']')
  }

  const arr = [1,2,[3,4,[5,6],7,8],9]
  const res = flatArray(arr)
  console.log('res: ', Array.isArray(res), res);
}


/**
 * 打平数组 - toString
 */
{
  function flatArray(arr=[]) {
    return JSON.parse('[' + arr + ']')
  }

  const arr = [1,2,[3,4,[5,6],7,8],9]
  const res = flatArray(arr)
  console.log('res: ', Array.isArray(res), res);
}