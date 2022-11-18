/*
 * @Author: fansonly
 * @Date: 2021-07-Sa 05:32:01
 * @Last Modified by:   fansonly
 * @Last Modified time: 2021-07-Sa 05:32:01
 */
/**
 * 大数相加
 */
function sumBigNumber(a, b) {
  let res = '', temp = ''
  a = String(a).split('')
  b = String(b).split('')
  while(a.length || b.length || temp.length) {
    temp += ~~a.pop() + ~~b.pop()
    res = (temp % 10) + res
    temp = temp > 9
  }
  return res.replace(/^0+/, '')
}

console.log(sumBigNumber(1000000000000001, 10000000000000001))

console.log(1000000000000001+10000000000000001)


// 从四月天 爱上asscreenY
