/**
 * 354. 俄罗斯信封套娃
 * https://leetcode.cn/problems/russian-doll-envelopes
 * 给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。
 * 当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
 * 请计算 最多能有多少个 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。
 * 
 * 注意：不允许旋转信封。
 * 
 * 思路解析：
 * 1. 先对 envelopes 按照宽度 w 升序
 * 2. 对宽度相同的信封按照高度 h 降序，确保相同宽度的信封最多只有一个 h 符合条件
 * 3. 计算高度 h 数组的最长递增子序列，即 LIS
 * 4. 返回 LIS 的长度
 * 
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n)
 */
function maxEnvelopes(envelopes) {
  const len = envelopes.length;
  envelopes.sort((a, b) => a[0] !== b[0]? a[0] - b[0] : b[1] - a[1])
  const arr = envelopes.map(item => item[1])
  let dp = new Array(len).fill(1);
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp);
}

// console.log(maxEnvelopes([[5,4],[6,4],[6,7],[2,3]])) // 3


/**
 * 解法2：二分查找
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 */
function maxEnvelopes2(envelopes) {
  const len = envelopes.length;
  envelopes.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1])
  // const arr = envelopes.map(item => item[1])
  const dp = new Array(len)
  let piles = 0
  for (let i = 0; i < len; i++) {
    const value = envelopes[i][1]
    let left = 0
    let right = piles
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2)
      if (dp[mid] >= value) {
        right = mid
      } else {
        left = mid + 1
      }
    }

    if (left === piles) piles++
    dp[left] = value
  }
  return piles
}

console.log(maxEnvelopes2([[5,4],[6,4],[6,7],[2,3]])) // 3