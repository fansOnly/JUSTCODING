/*
 * @Author: fansonly
 * @Date: 2021-08-28 17:14:41
 * @Description:
 * @LastEditTime: 2021-08-28 17:14:42
 */
/**
 * 四舍五入
 */
 export const toFixed = function (number, decimalLength = 0) {
  var times = Math.pow(10, decimalLength)
  var fixed = number * times + 0.5
  return parseInt(fixed) / times
}

console.log(toFixed(0.2286298683746, 3))

