/**
 * 300. 获取最长递增子序列
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/
 */
/**
 * 1、动态规划思路解析
 * 设dp[i]表示以nums[i]结尾的最长递增子序列的长度，则有如下递推式：
 * dp[i] = max(dp[j] + 1), 0 <= j < i && nums[j] < nums[i]
 * 其中j是所有小于nums[i]的索引，即nums[j] < nums[i]。
 * 则dp[i]表示以nums[i]结尾的最长递增子序列的长度，其值等于所有小于nums[i]的索引j对应的dp[j] + 1中的最大值。
 * 2、时间复杂度分析
 * 动态规划的时间复杂度为O(n^2)，其中n为数组nums的长度。
 * 3、空间复杂度分析
 * 动态规划的空间复杂度为O(n)，其中n为数组nums的长度。
 * 
 * base case：dp[0] = 1
 * 状态-数学归纳思想：假设dp[0,..., i-1]都已计算出结果，则dp[i]的状态可以由dp[0,..., i-1]推导出来。只要找出比nums[i]小的最长递增子序列的长度，再加上nums[i]即为当前的dp[i]值。
 * dp数组存储每个索引对应的最长递增子序列的长度。
 */
function lengthOfLIS(nums) {
  // 初始化dp数组，dp[i]默认为1
  let dp = new Array(nums.length).fill(1);
  // 外层循环处理每个元素nums[i]
  for (let i = 1; i < nums.length; i++) {
    // 内存循环处理所有在i之前的元素
    for (let j = 0; j < i; j++) {
      // 如果之前的元素nums[j]小于nums[i]，只需要将之前的dp值加1
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp);
}

// console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))


/**
 * 2、二分查找 - 扑克牌思路
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 * 
 * 给你一排扑克牌，我们像遍历数组那样从左到右一张一张处理这些扑克牌，最终要把这些牌分成若干堆。
 * 处理这些扑克牌要遵循以下规则：
 * 只能把点数小的牌压到点数比它大的牌上；如果当前牌点数较大没有可以放置的堆，则新建一个堆，把这张牌放进去；如果当前牌有多个堆可供选择，则选择最左边的那一堆放置。
 */
function lengthOfLIS2(nums) {
  const arr = new Array(nums.length)
  let piles = 0
  for (let i = 0; i < nums.length; i++) {
    const poker = nums[i]

    let left = 0
    let right = piles
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2)
      if (arr[mid] >= poker) {
        right = mid
      } else if (arr[mid] < poker) {
        left = mid + 1
      }
    }

    if (left === piles){
      piles++
    }
    arr[left] = poker
  }

  return piles
}

console.log(lengthOfLIS2([10,9,2,5,3,7,101,18]))