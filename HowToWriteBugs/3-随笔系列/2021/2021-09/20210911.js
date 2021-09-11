/*
 * @Author: fansonly
 * @Date: 2021-09-11 10:39:11
 * @Description:
 * @LastEditTime: 2021-09-11 11:35:02
 */

/**
 * @param {number} n
 * @return {string}
 */
 var countAndSay = function(n) {
  if (n == 1) return "1"
  let count = 0
  let prev = countAndSay(n - 1)
  console.log('prev: ', prev);
  let str = prev.charAt(0)
  let res = ''
  for (let i = 0; i < prev.length; i++) {
  if (str == prev.charAt(i)) {
      count++
  } else {
      res += count + '' + str
      console.log('res: ', res);
      str = prev.charAt(i)
      count = 1
  }
  }
  res += count + '' + str
  return res
  }
  console.log(countAndSay(6))
