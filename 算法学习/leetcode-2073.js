/**
 * 2073. 买票需要的时间
 * 
 * 有 n 个人前来排队买票，其中第 0 人站在队伍最前方 ，第 (n - 1) 人站在队伍最后方 。
 * 给你一个下标从 0 开始的整数数组 tickets ，数组长度为 n ，其中第 i 人想要购买的票数为 tickets[i] 。
 * 每个人买票都需要用掉恰好 1 秒 。一个人一次只能买一张票 ，如果需要购买更多票，他必须走到队尾重新排队（瞬间 发生，不计时间）。如果一个人没有剩下需要买的票，那他将会离开队伍。
 * 返回位于位置 k（下标从 0 开始）的人完成买票需要的时间（以秒为单位）。
 * 
 * 示例 1：
 * 输入：tickets = [2,3,2], k = 2
 * 输出：6
 * 解释： 
 * - 第一轮，队伍中的每个人都买到一张票，队伍变为 [1, 2, 1] 。
 * - 第二轮，队伍中的每个都又都买到一张票，队伍变为 [0, 1, 0] 。
 * 位置 2 的人成功买到 2 张票，用掉 3 + 3 = 6 秒。
 * 
 * 示例 2：
 * 输入：tickets = [5,1,1,1], k = 0
 * 输出：8
 * 解释：
 * - 第一轮，队伍中的每个人都买到一张票，队伍变为 [4, 0, 0, 0] 。
 * - 接下来的 4 轮，只有位置 0 的人在买票。
 * 位置 0 的人成功买到 5 张票，用掉 4 + 1 + 1 + 1 + 1 = 8 秒。
 * 
 * 提示：
 * n == tickets.length
 * 1 <= n <= 100
 * 1 <= tickets[i] <= 100
 * 0 <= k < n
 */

// O(N^2)
function timeRequiredToBuy(tickets, k) {
  let time = 0
  let num = tickets[k]
  while (num > 0) {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i] > 0) {
        time += 1
        tickets[i]--
        if (num === 1 && i === k) {
          break
        }
      }
    }
    num--
  }
  return time
}

// O(N) = bingo
function timeRequiredToBuy(tickets, k) {
  let time = 0
  let num = tickets[k]
  for (let i = 0; i < k; i++) {
    time += tickets[i] < num ? tickets[i] : num
  }
  for (let i = k + 1; i < tickets.length; i++) {
    time += tickets[i] < num - 1 ? tickets[i] : num - 1
  }
  return time + num
}

// O(N)
function timeRequiredToBuy(tickets, k) {
  let queue = []
  for (let i = 0; i < tickets.length; i++) {
    queue.push(i)
  }
  let time = 0
  while (queue.length) {
    const current = queue.shift()
    time++
    tickets[current]--

    if (current === k && tickets[current] === 0) {
      return time
    }

    if (tickets[current] === 0) {
      continue
    }

    queue.push(current)
  }

  return time
}

console.log(timeRequiredToBuy([2,3,2], 2)) // 6
console.log(timeRequiredToBuy([5,1,1,1], 0)) // 8