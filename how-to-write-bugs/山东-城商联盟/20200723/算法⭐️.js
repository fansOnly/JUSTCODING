// 二分查找


// 冒泡排序



// 快速排序
// 1 取中间临界值, 将数组一分为二(不包含临界值)
// 2 将大于临界值的放在一个数组, 小于临界值的放在一个数组
// 3 将两个数组和临界值拼接在一起
function quickSort(arr) {
    if (arr.length < 2) return arr
    const index = Math.floor(arr.length / 2)
    const flag = arr.splice(index, 1)[0]
    let left = [], right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= flag) {
            left.push(arr[i])
        }
        if (arr[i] > flag) {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([flag], quickSort(right))
}

var list = [1, 6, 8, 9, 3, 5, 64, 77, 22, 5]
var rrs = quickSort(list)
console.log(rrs)



// 最长公共子串 ???
function findSubStr(str1, str2) {
    if (str1.length > str2.length) {
        [str1, str2] = [str2, str1]
    }
    var result = ''
    var len = str1.length
    for (var j = len; j > 0; j--) {
        for (var i = 0; i < len - j; i++) {
            result = str1.substr(i, j)
            if (str2.includes(result)) return result
        }
    }
}
console.log(findSubStr('aabbcc11', 'ppooiiuubcc123'))


// 最长公共子序列 ???
function LCS(str1, str2) {
    var rows = str1.split("")
    rows.unshift("")
    var cols = str2.split("")
    cols.unshift("")
    var m = rows.length
    var n = cols.length
    var dp = []
    for (var i = 0; i < m; i++) {
        dp[i] = []
        for (var j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0
                continue
            }

            if (rows[i] === cols[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1 //对角＋1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) //对左边，上边取最大
            }
        }
        console.log(dp[i].join(""))//调试
    }
    return dp[i - 1][j - 1]
}
console.log(LCS('aabbcc11', 'ppooiiuubcc123'))



// 数组去重
var arr = [1, 2, 3, 4, 3, 4, 2, 5, 67, 8,]
var res1 = [...new Set(arr)]
console.log(res1)

let res2 = []
for (let i = 0; i < arr.length; i++) {
    if (!res2.includes(arr[i])) {
        res2.push(arr[i])
    }
}
console.log(res2)

let res3 = []
res3 = arr.reduce((acc, cur) => !acc.includes(cur) ? [...acc, cur] : [...acc], [])
console.log(res3)


// 柯里化 实现一个函数功能：sum(1,2,3,4..n)转化为 sum(1)(2)(3)(4)…(n)
const sum = (a, b, ...args) => {
    return [a, b, ...args].reduce((sum, val) => sum + val, 0)
}
console.log(sum(1, 2, 3))

// 1
const curry = function (fn) {
    const { length } = fn
    const args = Array.prototype.slice.call(arguments, 1)
    return function () {
        const args2 = Array.prototype.slice.call(arguments)
        const newArgs = args.concat(args2)
        if (newArgs.length >= length) {
            return fn.apply(this, newArgs)
        }
        return curry.call(this, fn, ...newArgs)
    }
}

const currySum = curry(sum)
console.log(currySum(1)(2, 3, 4))

// 2
const curry2 = (fn, ...args) => {
    return (...args2) => {
        return fn.apply(this, [...args, ...args2])
    }
}

const currySum2 = curry2(sum, 4)
console.log('currySum2: ', currySum2(1, 2, 3))


// 反转二叉树




// 贪心算法




// 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。 ????
// 1 外层循环 - 从i=0开始, 到数组长度结束, 当前索引的值不能大于和的一半
// 2 内层循环 - 从j=i+1开始, 到数组长度结束
// 3 返回相加等于和的两个数
function findNumBySum(arr, sum) {
    for (let i = 0; i < arr.length - 1 && arr[i] < sum / 2; i++) {
        for (let j = i + 1; j < arr.length - 1; j++) {
            if (arr[i] + arr[j] === sum) {
                return [arr[i], arr[j]]
            }
        }
    }
    return []
}
var arr = [1, 2, 3, 4, 5, 7, 9, 12, 14, 23, 24, 26, 29]
console.log(findNumBySum(arr, 30))





// 叉树各种(层序)遍历






// 排序算法
// 1 插入排序
// function insertSort(arr) {
//     let temp
//     for (let i = 1; i < arr.length; i++) {
//         temp = arr[i]
//         for (let j = i; j > 0 && temp < arr[j - 1]; j--) {
//             arr[j] = arr[j - 1]
//         }
//         arr[j] = temp
//     }
//     return arr
// }
// var list = [1, 6, 8, 9, 3, 5, 64, 77, 22, 5]
// console.log(insertSort(list))



// 2 归并排序
// 3 二分插入排序




// 二叉树各种(层序)遍历






