/**
 * 哈希函数实现
 * 1. 传入字符串，转换成较大的数字
 * 2. 将数字压缩到指定的范围内
 * @param {*} str 字符串
 * @param {*} size 指定范围
 * @returns 
 */
function hashFunc(str, size) {
  let hashCode = 0
  for (let i = 0; i < str.length; i++) {
    // 37 是业界使用较多的质数
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }

  return hashCode % size
}
