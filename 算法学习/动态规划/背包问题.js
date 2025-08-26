/**
 * 2548. 背包问题
 * 给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。
 * 其中第 i 个物品的重量为 wt[i]，价值为 val[i]。
 * 现在让你用这个背包装物品，每个物品只能用一次，在不超过背包容量的前提下，最多能装的价值是多少？
 * 
 * 状态：物品 + 背包 - 二维数组
 * 选择：第 i 个物品装进背包或者不装进背包
 */
function backpack(W, wt, val) {
  const N = wt.length;
  const dp = new Array(N + 1).fill().map(() => new Array(W + 1).fill(0))

  for (let i = 1; i<= N; i++) {
    for (let w = 1; w <= W; w++) {
      if (w - wt[i - 1] < 0) {
        dp[i][w] = dp[i - 1][w]
      } else {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt[i - 1]] + val[i - 1])
      }
    }
  }
  return dp[N][W];
}

console.log(backpack(4, [2,1,3], [4,2,3]))