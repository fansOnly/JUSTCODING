/**
 * 322. 零钱兑换
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER)
  dp[0] = 0
  for (let i = 1; i < dp.length; i++) {
    for (let coin of coins) {
      if (i - coin < 0) continue // 目标面值比硬币小，凑不出
      dp[i] = Math.min(dp[i], dp[i - coin] + 1) // +1：先用一枚 coin 硬币，再凑剩余金额 i - coin
    }
  }

  console.log('dp: ', dp);
  return dp[amount] == Number.MAX_SAFE_INTEGER ? -1 : dp[amount]
}

console.log(coinChange([ 3, 5], 7))