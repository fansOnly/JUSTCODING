/*
 * @Author: fansonly
 * @Date: 2022-02-17 10:25:38
 * @Description:
 * @LastEditTime: 2022-02-17 10:30:38
 */

function formatDecimal(value, min = 2, max = 4) {
  if (!value) return (0).toFixed(min)
  const num = Number(value)
  let [integer, decimal = '0'.repeat(min)] = String(num).split('.')
  if (decimal.length < min) {
    return integer +'.' + decimal.padEnd(min, '0')
  } else if (decimal.length >= max) {
    return Number(num).toFixed(max)
  } else {
    return integer +'.' + decimal
  }
}


console.log(formatDecimal(1.123242, 3, 6))
