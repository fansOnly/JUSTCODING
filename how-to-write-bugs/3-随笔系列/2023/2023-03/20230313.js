/**
 * 十进制转二进制
 */
const bin2ten = num => {
  let res = []
  while (num > 0) {
    res.push(num % 2)
    num = parseInt(num / 2)
  }
  return res.reverse().join('')
}

console.log(bin2ten(5))
console.log(bin2ten(4))
