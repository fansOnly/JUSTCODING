/**
 * 栈结构
 */
const matches = {
  '(': ')',
  '{': '}',
  '[': ']'
}
var isValid = function (s) {
  const stack = []
  let i = 0
  let char = ''
  while (i < s.length) {
    char = s.charAt(i)
    if (matches[char]) {
      stack.push(matches[char])
    } else if (char === stack[stack.length - 1]) {
      stack.pop()
    }
    i++
  }
  return stack.length === 0
}

console.log(isValid('(21312ssss)[2]{132}'))
console.log(isValid('(112122)'))
console.log(isValid('(]'))
