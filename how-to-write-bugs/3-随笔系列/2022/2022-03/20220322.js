/*
 * @Author: fansonly
 * @Date: 2022-03-22 14:52:48
 * @Description:
 * @LastEditTime: 2022-03-24 19:52:25
 */

function moneyRule(value) {
  return value.replace(/(?<=\.\d{2})\d+$/, '')
}

console.log(moneyRule('111.111111111'))



function moneyRule2(value) {
  return value.replace(/(?<=\d)0$/, '')
}

console.log(moneyRule2('111.10'))


export function checkPass(v) {
  return /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/.test(String(v))
}


console.log(checkPass('111111111a'))



export const dataMasking = (value, start = 0, end = 0) => {
  value = String(value)
  if (end > value.length) end = value.length
  if (start < 0) start = 0
  const reg = new RegExp('(\\d{' + start + '})\\d*(\\d{' + (value.length - end) + '})')
  return value.replace(reg, (_, $1, $2) => {
    return $1 + '*'.repeat(end - start).replace(/\B(?=(\*{4})+$)/g, ' ') + ' ' + $2
  })
}

console.log(dataMasking('13344445555', 3, 7))
console.log(dataMasking('133444455556666', 3, 11))
