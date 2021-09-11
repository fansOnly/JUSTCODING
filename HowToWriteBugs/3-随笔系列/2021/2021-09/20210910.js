/*
 * @Author: fansonly
 * @Date: 2021-09-10 09:17:15
 * @Description:
 * @LastEditTime: 2021-09-10 16:17:48
 */

/**
 * 求最大子序和
 * 动态规划
 */
const maxSubArray = nums => {
  let max = nums[0], pre = 0
  for (const num of nums) {
    if (pre > 0) {
      pre += num
    } else {
      pre = num
    }
    max = Math.max(pre, max)
  }
  return max
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))


/**
 * 爬楼梯
 * 动态规划 O(n) O(1)
 */
const climStairs = n => {
  let res = 1, prev = 1, prev2 = 1
  for (let i = 2; i < n; i++) {
    res = prev + prev2
    prev2 = prev
    prev = res
  }
  return res
}



/**
 * 最小花费爬楼梯
 * 动态规划 O(n) O(n)
 */
const minCostClimStaire = cost => {
  cost.push(0)
  let dp = [], len = cost.length
  dp[0] = cost[0]
  dp[1] = cost[1]
  for (let i = 2; i < len; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i], dp[i - 2])
  }
  return dp[len - 1]
}

console.log(minCostClimStaire([10, 15, 20]))
console.log(minCostClimStaire([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))


/**
 *  买卖股票的最佳时机
 * 动态规划 O(n) O(1)
 */
const maxProfit = prices => {
  let max = 0, min = prices[0]
  for (let i = 1; i < prices.length; i++) {
    min = Math.min(prices[i], min)
    max = Math.max(max, prices[i] - min)
  }
  return max
}
console.log(maxProfit([7, 1, 5, 3, 6, 4]))
console.log(maxProfit([7, 6, 4, 3, 2, 1]))




/**
 * 回文字符串
 * 双指针  O(n) O(n)
 */
 var isPalindrome = function(s) {
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  let i = 0; j = s.length - 1
  while (i < j) {
      if (s[i] !== s[j]) {
          return false
      }
      i++
      j--
  }
  return true
  }
  console.log(isPalindrome("A man, a plan, a canal: Panama"))



  /**
 *
 */
var myAtoi = function(s) {
  let res = s.trim()
  let sym = res.startsWith('-') ? '-' : ''
  res = res.replace(/^\-?(\d+)/g, (_, p) => {
    console.log('p', p)
    return p
  })
  console.log('res: ', res);
  return res === 0 ? 0 : parseFloat(`${sym}${res}`)
  }
  console.log(myAtoi('words and 987'))
