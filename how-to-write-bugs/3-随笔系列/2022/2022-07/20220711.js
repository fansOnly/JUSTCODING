const getParameterFromUrl = url => {
  const queryString = url.split('?')[1]
  const reg = /([^?=&]+)(=*[^&=]*)/g
  const matches = queryString.match(reg)
  console.log('matches: ', matches);
  return matches.reduce((acc, cur) => {
    const [key, val = true] = cur.split('=')
    acc[key] = val
    return acc
  }, {})
}


console.log(getParameterFromUrl('/pages/index/index?a=1&b=2&c='))


/**
 * 快速排序 - 递归循环
 * 1. 选择数组中的某一个元素作为枢轴（中间元素最佳）
 * 2. 所有小于枢轴的元素都移动到左侧，大于等于枢轴的元素都移动到右侧
 * 3. 对于两个子集重复第一步和第二步，直至数组只剩下一个元素
 */
const quickSort = arr => {
  if (arr.length < 2) return arr
  const pivotIndex = arr.length >> 1
  const pivot = arr.splice(pivotIndex, 1)[0]
  let leftArr = [], rightArr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      leftArr.push(arr[i])
    } else {
      rightArr.push(arr[i])
    }
  }
  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)]
}

console.log(quickSort([86, 24, 64, 48, 15, 30, 90, 49]))


/**
 * 二分查找 - while 循环
 * 1. 以有序数组的中间元素作为搜索键
 * 2. 如果搜索键等于目标值，返回改索引
 * 3. 如果搜索健小于目标值，则将搜索范围缩小至后半部分
 * 4. 如果搜索键大于目标值，则将所搜范围缩小至前半部分
 * 5. 重复上述步骤至搜索范围为空
 */
const binarySearch = (arr, str) => {
  let i = 0, len = arr.length - 1
  let mid
  while (i <= len) {
    mid = (i + len) >> 1
    if (str > arr[mid]) {
      i = mid + 1
    } else if (str < arr[mid]) {
      len = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

var arr = [15, 24, 30, 48, 49, 64, 86, 90, 100, 121, 130]
console.log(binarySearch(arr, 64))


/**
 * 反转链表
 * 时间复杂度：O(n) n 为链表的长度
 * 空间复杂度：O(1)
 */
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

let head = new Node(1)
head.next = new Node(3)
head.next.next = new Node(9)
head.next.next.next = new Node(6)
head.next.next.next.next = new Node(2)

const reverseNodeList = head => {
  let prev = null
  let next = null
  let current = head

  while (current !== null) {
    next = current.next
    current.next = prev
    prev = current
    current = next
  }

  return prev
}

console.log(head)
console.log(reverseNodeList(head))

/**
 * 括号匹配 - 栈结构
 * 1. 遍历字符串
 * 2. 遇到左括号 则将其放入栈中
 * 3. 遇到右括号，则取出栈顶的元素与之比较，如果不一样则匹配失败
 * 时间复杂度：O(n) n 为字符串的长度
 * 空间复杂度：O(n)
 */
const brackets = {
  '(': ')',
  '[': ']',
  '{': '}',
}
const isPairedBrackets = str => {
  if (!str.length) return true
  let stack = []
  for (let i = 0; i < str.length; i++) {
    const val = str[i]
    if (['(', '[', '{'].includes(val)) {
      stack.push(brackets[val])
    } else {
      if (!stack.length || val !== stack.pop()) {
        return false
      }
    }
  }
  return !stack.length
}

console.log(isPairedBrackets('{}[([])]]'))


/**
 * 十进制转二进制 - 栈结构
 * 时间复杂度：O(n) n 为二进制长度
 * 空间复杂度：O(n) n 为二进制长度
 */
const dec2bin = dec => {
  let res = ''
  const stack = []
  while (dec > 0) {
    // 余数入栈
    stack.push(dec % 2)
    // 除以 2
    dec = dec >> 1
  }

  while (stack.length) {
    res += stack.pop()
  }

  return res
}

console.log(dec2bin(10))
console.log(dec2bin(5))


/**
 * 删除排序链表中的重复元素
 * 时间复杂度：O(n) n 为链表的长度
 * 空间复杂度：O(1)
 */
const deleteDuplicates = head => {
  let p = head
  while (p && p.next) {
    if (p.value === p.next.value) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  return head
}

head = new Node(1)
head.next = new Node(3)
head.next.next = new Node(3)
head.next.next.next = new Node(6)
head.next.next.next.next = new Node(9)
console.log(head)
console.log(deleteDuplicates(head))


/**
 * 两数之和 - 字典
 * 时间复杂度：O(n) n 为源数组的长度
 * 空间复杂度：O(n)
 */
const getTwoNumber = (arr, target) => {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i], b = target - a
    if (map.has(b)) {
      return [map.get(b), i]
    } else {
      map.set(a, i)
    }
  }
  return [-1, -1]
}

var arr = [2, 7, 11, 15]
var target = 9
console.log(getTwoNumber(arr, target))


/**
 * 两个数组的交集 - 字典
 * 时间复杂度：O(m + n) m，n 为两个源数组的长度
 * 空间复杂度：O(n) n 为交集数组的长度
 */
const intersection = (arr1, arr2) => {
  const map = new Map()

  arr1.map(v => map.set(v, true))

  const res  = []

  arr2.map(v => {
    if (map.has(v)) {
      res.push(v)
      map.delete(v)
    }
  })
  return res
}

var arr1 = [1, 2, 2, 1], arr2 = [2, 2]
console.log(intersection(arr1, arr2))
