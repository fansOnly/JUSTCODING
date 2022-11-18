/*
 * @Author: fansonly
 * @Date: 2021-09-09 15:05:26
 * @Description:
 * @LastEditTime: 2021-09-10 09:17:05
 */


/**
 * @param {number} x
 * @return {number}
 */
 var reverse = function(x) {
  let res = 0
  while(x != 0) {
      res = res * 10 + x % 10
      if (res < (-2)**31 || res > 2**31 - 1) {
          return 0
      }
      x = ~~(x / 10)
  }
  return res
  };

  console.log(reverse(123))







  /**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false
  const map = new Map()
  for(let i = 0; i < s.length; i++) {
      map.set(s[i], (map.get(s[i]) || 0) + 1)
  }
  for (let i = 0; i < t.length; i++) {
      let count = map.get(t[i]) || 0
      if (count > 0) {
          map.set(t[i], --count)
      } else {
          return false
      }
  }
  return true
  };
  console.log(isAnagram('aacc', 'ccac'))




  /**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false
s=s.split().sort().join()
t=t.split().sort().join()
for (let i = 0; i < s.length; i++) {
  if (s[i] !== t[i]) {
      return false
  }
}
return true
};
console.log(isAnagram("anagram","nagaram"))
