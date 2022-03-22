/*
 * @Author: fansonly
 * @Date: 2022-03-22 14:52:48
 * @Description:
 * @LastEditTime: 2022-03-22 14:59:06
 */

function moneyRule(value) {
  return value.replace(/(?<=\.\d{2})\d+$/, '')
}

console.log(moneyRule('111.111111111'))



function moneyRule2(value) {
  return value.replace(/(?<=\d)0$/, '')
}

console.log(moneyRule2('111.10'))
