/*
 * @Author: fansonly
 * @Date: 2022-04-01 11:18:39
 * @Description:
 * @LastEditTime: 2022-04-01 17:06:10
 */


function dataMasking(value, start = 0, end = 0, space = false) {
  value = String(value)
  if (end > value.length) end = value.length
  if (start < 0) start = 0
  const reg = new RegExp('(\\d{' + start + '})\\d*(\\d{' + (value.length - end) + '})')
  return value.replace(reg, (_, $1, $2) => {
    return $1 + '*'.repeat(end - start).replace(/\B(?=(\*{4})+$)/g, space ? ' ' : '') + (space ? ' ' : '') + $2
  })
}

console.log(dataMasking('6617111122227868', 4, 12, true))
