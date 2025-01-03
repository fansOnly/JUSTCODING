/**
 * 利用 reverse 实现回文字符串判断
 */
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false

/**
 * 进阶版，剔除符号
 */
function isPalindrome(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('').reverse().join('');
}

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car')); // false