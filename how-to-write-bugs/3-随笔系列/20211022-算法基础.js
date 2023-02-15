/**
 * 扑克牌算法
 *
 * 魔术师手中有一堆扑克牌，观众不知道它的顺序，接下来魔术师：
 * 从牌顶拿出一张牌， 放到桌子上
 * 再从牌顶拿一张牌， 放在手上牌的底部
 * 如此往复（不断重复以上两步），直到魔术师手上的牌全部都放到了桌子上。
 * 此时，桌子上的牌顺序为：(牌顶) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌底)。
 *
 *
 * 反向推导:
 * 假设，原来魔术师手上牌的顺序数组为 origin ，最后放在桌子上的顺序数组为 result
 * 正向的操作为: origin 取出第一个插入 result 前面， origin 再取出第一个换到自己的末尾，如此重复；
 * 反向操作为: origin 最后一个放到自己的第一个前面， result 拿出第一个插入 origin 前面，如此重复；
 */
const pokerAlgorithm = arr => {
  const origin = []
  for (let i = 0; i < arr.length; i++) {
    if (origin.length) {
      const item = origin.pop()
      origin.unshift(item)
    }
    origin.unshift(arr[i])
  }
  return origin
}


console.log(pokerAlgorithm([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]))


/**
 * 查找字符串的最长公共子串
 *
 * 双指针
 */
const longestSubStr = str => {
  let i = 0, j = 1
  let max = 0, char = ''
  while (i < str.length - 1) {
    if (str[i] !== str[j]) {
      if (max < j - i) {
        char = str[i]
      }
      max = Math.max(max, j - i)
      i = j
    }
    j++
  }
  return `${char}出现了${max}次`
}

console.log(longestSubStr('aaaabbbbbccccccccdddd'))


/**
 *  斐波那契数列
 *
 * 1. 递归
 * 2. 尾递归优化
*/
const fibonacci = n => {
  if (n < 2) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}
console.time()
console.log(fibonacci(20))
console.timeEnd()

function fibonacci2(n, start = 1, total = 1) {
  if (n < 2) return total
  return fibonacci2(n - 1, total, start + total)
}
console.time()
console.log(fibonacci2(20))
console.timeEnd()



/**
 * 数组转换
 */
const transform = arr => {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push({ children: transform(arr[i]) })
    } else if (typeof arr[i] === 'number') {
      result.push({ value: arr[i] })
    }
  }

  return result
}

const transform2 = item => {
  if (typeof item === 'number') {
    return {
      value: item
    }
  } else if (Array.isArray(item)) {
    return {
      children: item.map(v => transform2(v))
    }
  }
}

var arr = [1, 2, [3, [4, 5], 6], 7, [8], 9]
// console.log(transform(arr))
console.log(transform2(arr))


/**
 * 栈结构
 * LIFO
 *
 * 智能重复
 *
 * 3[abc] => abcabcabc
 *
 * 3[2[a]2[b]] => aabbaabbaabb
 *
 * 2[1[a]3[b]2[3[c]4[d]]] => abbbcccddddcccddddabbbcccddddcccdddd
 *
 * 思路：
 * 1. 准备两个栈，一个存放数字，一个存放字母
 * 2. 遇到数字，将数字放入栈 A(2) [2] => [2, 3]
 * 3. 遇到 [，将 空字符串压入栈 B，遇到字母(a)，将栈B的栈顶改为字母 [''] => ['', ''] => ['', 'a']
 * 4. 遇到 ]，将栈A的栈顶出栈，同时将栈B的栈顶出栈，将 字母重复数字次后，保存为栈B的新栈顶的值 [2, 3] => [2], ['', 'a'] => [''] => ['aaa']
 */
const smartRepeat = str => {
  let i = 0
  // 次数栈 + 字符栈 或者使用 复合栈 [{ char: '', times: 0 }]
  let stack1 = [], stack2 = []
  // 剩余的字符串
  let temp = str

  while (i < str.length - 1) {
    temp = str.substring(i)
    // 通过正则匹配
    if (/^\d+\[/.test(temp)) {
      const times = temp.match(/^(\d+)\[/)[1]
      stack1.push(+times)
      stack2.push('')

      // +1 指针后移
      i += times.length + 1
    } else if (/^\w+\]/.test(temp)) {
      const char = temp.match(/^(\w+)\]/)[1]
      stack2[stack2.length - 1] = char

      i += char.length
    } else if (temp[0] === ']') {
      // 当前的最后一个字母匹配结束，出栈
      const times = stack1.pop()
      const char = stack2.pop()
      stack2[stack2.length - 1] += char.repeat(times)

      i++
    }
  }

  return stack2[0].repeat(stack1[0])
}

console.log(smartRepeat('3[2[a]2[b]]'))
console.log(smartRepeat('2[1[a]3[b]2[3[c]4[d]]]'))
