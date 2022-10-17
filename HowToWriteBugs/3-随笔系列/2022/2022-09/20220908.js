/**
 * 数据脱敏(卡号，手机号，姓名等)
 * @param {*} value 脱敏值
 * @param {*} start 起始位置
 * @param {*} end 结束位置
 * @param {*} space 空格格式
 *
 * @example
 * 1. desensitization('6214600180042761374', 4, -4, true) => 6214 *** **** **** 1374
 * 2. desensitization('18866663333', 3. -4) => 188***3333
 * 3. desensitization('李淳风', 0, 1) => *淳风
 * 4. desensitization('李淳风', 1) => 李**
 */
function desensitization(value, start = 0, end = String(value).length, space = false) {
  value = String(value)
  const { length } = value
  if (end > value.length) end = length
  if (end < 0) end = length + end
  if (start < 0) start = length + start
  const masking = '*'.repeat(end - start).replace(/\B(?=(\*{4})+$)/g, space ? ' ' : '')
  const reg = new RegExp('(\.{' + start + '})\.*(\.{' + (length - end) + '})')
  return value.replace(reg, (_, $1, $2) => {
    return space ? `${$1} ${masking} ${$2}` : $1 + masking + $2
  })
}

const card = '6214600180042761374'

// console.log(desensitization(card, 4, -4))
console.log(desensitization(card, 4, -4, true))
// console.log(desensitization(card, -4, -3))
// console.log(desensitization(card, 4, 15))

const phone = '18866663333'
// console.log(desensitization(phone, 3, -4))
console.log(desensitization(phone, 3, -4, true))


const card2 = '6214***********1374'
// console.log(desensitization(card2, 4, -4))

// console.log(desensitization(1234444444444, 3, ))

const name = '李淳风'

console.log(desensitization(name, 0, 1))
console.log(desensitization(name, 1))
console.log(desensitization(name, 1, 2))
