/**
 * 实现sendRequest(promises, max, callback)，
 * 同时最多执行max个promises，超过的等待有空闲的开始执行，
 * 执行完成后执行callback
 */
const sendRequest = (promises, max, callback) => {
    let current = 0
    const results = []
    const originLen = promises.length
    const next = () => {
        while (current < max && promises.length) {
            const index = originLen - promises.length
            const promise = promises.shift()
            results[index] = {
                value: null,
                reason: null
            }
            Promise.resolve(promise).then(value => {
                results[index].value = value
            }, reason => {
                results[index].reason = reason
            }).finally(() => {
                current--
                next()
            })
            current++
        }
        if (current === 0) {
            callback(results)
        }
    }
    next()
}

const promise1 = Promise.resolve(1)
const promise2 = Promise.resolve(2)
const promise3 = Promise.reject(3)
const promise4 = Promise.resolve(4)

const log = arr => {
    arr.map(v => {
        console.log(v)
    })
}

sendRequest([promise1, promise2, promise3, promise4], 3, log)

// 1 进入 while => current = 0 => 产生微任务1 promise1 => current = 1, promises.length = 3
// 2 进入 while => current = 1 => 产生微任务2 promise2 => current = 2, promises.length = 2
// 3 进入 while => current = 2 => 产生微任务3 promise3 => current = 3, promises.length = 1
// 4 进入 while => current = 3 => 跳出while
// 5 执行微任务1 => resolve(1) => 执行finally => current = 2 => 执行next()
// 6 进入while => current = 2 => 产生微任务4 promise4 => current = 3, promises.length = 0 => 跳出while
// 7 执行微任务2 => resolve(2) => 执行finally => current = 2, promises.length = 0
// 8 执行微任务3 => reject(3) => 执行finally => current = 1, promises.length = 0
// 9 执行微任务4 => resolve(4) => 执行finally => current = 0, promises.length = 0 => 执行callback()




/**
 * 实现compose函数，类似koa-compose中间件
 */
const compose = (middlewares) => {
    return function() {
        dispatch(0)
        function dispatch(i) {
            const fn = middlewares[i]
            if (!fn) return
            return fn(function next() {
                dispatch(i + 1)
            })
        }
    }
}


/**
 * 单项链表是否存在环
 * 力扣第141题：https://leetcode-cn.com/problems/linked-list-cycle/
 */
function hasCycle(head) {
    let temp = head
    const map = new Map()
    while (temp) {
        if (map.has(temp)) {
            return true
        }
        map.set(temp, true)
        temp = temp.next
    }
    return false
}


/**
 * 实现 findFirstIndex函数，
 * 找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 45, 55, 67]中第一次出现的位置，
 * 比如7第一次出现的位置是4
 */
function findFirstIndex(arr, target) {
    let begin = 0
    let end = arr.length
    while (begin < end) {
        const mid = (begin + end) >>> 1
        if (arr[mid] >= target) {
            end = mid
        } else {
            begin = mid + 1
        }
    }
    if (begin === arr.length) return -1
    return arr[begin] === target ? begin : -1
}

const arr1000 = [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]
console.log(findFirstIndex(arr1000, 7)) // 4
console.log(findFirstIndex(arr1000, 45)) // 11


/**
 * 十进制转换成任意进制
 */
function tenToOther(num, base) {
    const baseNumber = '0123456789abcdefghijklmnopqrstuvwxyz'
    const result = []
    while (num) {
        const rest = num % base
        num = Math.floor(num / base)
        result.unshift(baseNumber[rest])
    }
    return result.join('')
}

console.log(tenToOther(10, 2)) // 1010




/**
 * 大数相加
 * bug 当计算超过21为数字时会出错
 */
function bigAdd(a, b) {
    const aArr = a.toString().split('')
    const bArr = b.toString().split('')

    let flag = 0
    const result = []
    while(aArr.length || bArr.length) {
        const left = aArr.pop() || 0
        const right = bArr.pop() || 0
        const value = Number(left) + Number(right) + flag
        result.unshift(value % 10)
        flag = parseInt(value / 10)
    }
    if (flag) {
        result.unshift(flag)
    }
    return result.join('')
}

console.log(bigAdd(123456789012345678900, 123456789012345678900), (12345678901234567890+12345678901234567890))



/**
 * 深拷贝
 */
function deepClone(obj, map = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    if (map.has(obj)) {
        return map.get(obj)
    }
    const copy = Array.isArray(obj) ? [] : {}
    map.set(obj, copy)
    const keys = Reflect.ownKeys(obj)
    keys.forEach(key => {
        copy[key] = deepClone(obj[key], map)
    })
    return copy
}



/**
 * 青蛙跳台阶
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法
 * 青蛙跳台阶问题: https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/
 */
const climbStairs = n => {
    if (n <=2) return n
    let n1 = 1, n2 = 2, nn = 0
    for (let i = 3; i <= n; i++) {
        nn = n1 + n2
        n1 = n2
        n2 = nn
    }
    return nn
}

console.log(climbStairs(3)) // 3 111 12 21
console.log(climbStairs(4)) // 5 112 121 221 1111 22
console.log(climbStairs(5)) // 8 11111 122 212 221 1211 1121 1112 2111


/**
 * 图片懒加载写代码
 * https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
 */
function lazyload() {
    const observe = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const lazyImage = entry.target
            if (lazyImage.isInterecting && lazyImage.getAttribute('src') === 'loading.gif') {
                lazyImage.src = lazyImage.dataset.src
                observe.unobserve(lazyImage)
            }
        })
    })
    for (let i = 0; i < imgs.length; i++) {
        observe.observe(imgs[i])
    }
}


/**
 * 二叉树的最大深度
 * 给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例：给定二叉树 [3,9,20,null,null,15,7]，
 *     3
 *    / \
 *   9  20
 *   /   \
 *  15    7
 * 力扣第104题：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 */
const maxDepth = root => {
    if (!root) return 0
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1
}



/**
 * 连续子数组的最大和
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 输入: [-2,1,-3,4,-1,2,1,-5,4]
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 * 力扣第53题：https://leetcode-cn.com/problems/maximum-subarray/
 */
const maxSubArray = nums => {
    let current = nums[0]
    let max = nums[0]
    for (let i = 0; i < nums.length; i++) {
        if (current < 0) {
            current = nums[i]
        } else {
            current += nums[i]
        }
    }
    if (max < current) {
        max = current
    }
    return max
}


/**
 * 235. 二叉搜索树的最近公共祖先
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
 * 对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）
 * 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 * 输出: 6 
 * 解释: 节点 2 和节点 8 的最近公共祖先是 6。
 */
const lowestCommonAncestor = (root, p, q) => {
    while(root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right
        } else {
            break;
        }
    }
    return root
}


/**
 * 226.二叉树的左右子树交换代码实现
 * https://leetcode-cn.com/problems/invert-binary-tree/
 * 翻转一棵二叉树
 */
const invertTree = root => {
    if (root === null) return null
    const left = invertTree(root.left)
    const right = invertTree(root.right)
    root.left = right
    root.right = left
    return root
}


/**
 * 64.最小路径和
 * https://leetcode-cn.com/problems/minimum-path-sum/
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
 * // TODO 没看
 */
const minPathSum = grid => {
    let n = grid.length;
    let m = grid[0].length;
    let dp = Array.from(new Array(n), () => new Array(m));
    for (let i = 0; i < n; i ++) {
        for (let j = 0; j < m; j ++) {
            if (i != 0 && j != 0) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            } else if (i == 0 && j != 0) {
                dp[i][j] = dp[i][j - 1] + grid[i][j];
            } else if (i != 0 && j == 0) {
                dp[i][j] = dp[i - 1][j] + grid[i][j];
            } else if (i == 0 && j == 0) {
                dp[i][j] = grid[i][j];
            }
        }
    }
    return dp[n - 1][m - 1];

}
