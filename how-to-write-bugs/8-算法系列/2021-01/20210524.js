/**
 * 查找字符串数组中的最长公共前缀
 */
const a1 = ["flower","flow","flight"]
const a2 = ["dog","racecar","car"]
/**
 * 1.逐个比较
 * 时间复杂度：O(s)，s 是所有字符串中字符数量的总和
 * 空间复杂度：O(1)
 */
const longestCommonPrefix = strs => {
  if (strs === null || strs.length === 0) return ''
  let prev = strs[0]
  for (let i = 1; i < strs.length; i++) {
    let j = 0
    for (; j < prev.length && j < strs[i].length; j++) {
      if (prev.charAt(j) !== strs[i].charAt(j)) {
        break
      }
    }
    prev = prev.substr(0, j)
    if (prev === '') return ''
  }
  return prev
}

console.log(longestCommonPrefix(a1))
console.log(longestCommonPrefix(a2))


/**
 * 2. 仅需最大、最小字符串的最长公共前缀
 * 时间复杂度：O(n+m)，n是数组的长度， m 是字符串数组中最短字符的长度
 * 空间复杂度：O(1)
 */
const longestCommonPrefix2 = strs => {
  if (strs === null || strs.length === 0) return "";
  if(strs.length === 1) return strs[0]
  let max = 0, min = 0
  for (let i = 0; i < strs.length; i++) {
    if (strs[min] > strs[i]) min = i
    if (strs[max] < strs[i]) max = i
  }
  let j = 0
  for (; j < strs[min].length; j++) {
    if (strs[min].charAt(j) !== strs[max].charAt(j)) break
  }
  return strs[min].substr(0, j)
}

console.log(longestCommonPrefix2(a1))
console.log(longestCommonPrefix2(a2))


/**
 * 3. 分治策略 归并思想
 * 时间复杂度：O(s)，s 是所有字符串中字符数量的总和
 * 空间复杂度：O(m*logn)，n是数组的长度，m为字符串数组中最长字符的长度
 */
const longestCommonPrefix3 = strs => {
  if (strs === null || strs.length === 0) return ''
  return lCPrefixRec(strs)
}
function lCPrefixRec(arr) {
  const { length } = arr
  if (length == 1) {
    return arr[0]
  }
  const mid = Math.floor(length / 2)
  const left = arr.slice(0, mid), right = arr.slice(mid, length)
  return lCPrefixTwo(lCPrefixRec(left), lCPrefixRec(right))
}
function lCPrefixTwo(str1, str2) {
  let j = 0
  for (; j < str1.length && j < str2.length; j++) {
    if (str1.charAt(j) !== str2.charAt(j)) break
  }
  return str1.substr(0, j)
}

console.log(longestCommonPrefix3(a1))
console.log(longestCommonPrefix3(a2))



/**
 * 4. Trie 树（字典树）
 * Trie 树，也称为字典树或前缀树，顾名思义，它是用来处理字符串匹配问题的数据结构，以及用来解决集合中查找固定前缀字符串的数据结构
 * 时间复杂度：O(s+m)，s 是所有字符串中字符数量的总和，m为字符串数组中最长字符的长度，构建 Trie 树需要 O(s) ，最长公共前缀查询操作的复杂度为 O(m)
 * 空间复杂度：O(s)，用于构建 Trie 树
 */
// TODO
 var longestCommonPrefix4 = function(strs) {
  if (strs === null || strs.length === 0) return "";
  // 初始化 Trie 树
  let trie = new Trie()
  // 构建 Trie 树
  for(let i = 0; i < strs.length; i++) {
      if(!trie.insert(strs[i])) return ""
  }
  // 返回最长公共前缀
  return trie.searchLongestPrefix()
};
// Trie 树
var Trie = function() {
  this.root = new TrieNode()
};
var TrieNode = function() {
  // next 放入当前节点的子节点
  this.next = {};
  // 当前是否是结束节点
  this.isEnd = false;
};
Trie.prototype.insert = function(word) {
  if (!word) return false
  let node = this.root
  for (let i = 0; i < word.length; i++) {
      if (!node.next[word[i]]) {
          node.next[word[i]] = new TrieNode()
      }
      node = node.next[word[i]]
  }
  node.isEnd = true
  return true
};
Trie.prototype.searchLongestPrefix = function() {
  let node = this.root
  let prevs = ''
  while(node.next) {
      let keys = Object.keys(node.next)
      if(keys.length !== 1) break
      if(node.next[keys[0]].isEnd) {
          prevs += keys[0]
          break
      }
      prevs += keys[0]
      node = node.next[keys[0]]
  }
  return prevs
}
