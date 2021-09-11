/*
 * @Author: fansonly
 * @Date: 2021-09-11 10:39:11
 * @Description:
 * @LastEditTime: 2021-09-11 15:03:26
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


  /**
   *  最长公共前缀
   */
  const longestCommonPrefix = function(strs) {
    for (let i = 0; i < strs[0].length; i++) {
      const str = strs[0][i]
      for (let j = 1; j < strs.length; j++) {
        if (strs[j][i] === str || i == strs[j].length) {
          continue
        } else {
          return strs[0].substr(0, j)
        }
      }
    }
    return strs[0]
  }
  console.log(longestCommonPrefix(["flower","flow","flight"]))
