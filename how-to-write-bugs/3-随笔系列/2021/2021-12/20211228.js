/*
 * @Author: fansonly
 * @Date: 2021-12-28 17:48:51
 * @Description:
 * @LastEditTime: 2021-12-30 14:50:34
 */


const desensitizeName = (value, char = '*') => {
  return String(value).replace(/^([\u4e00-\u9fa5])([\u4e00-\u9fa5]*)([\u4e00-\u9fa5])$/, function(_, p1, p2, p3) {
    return p2 ? p1 + char.repeat(p2.length) + p3 : p1 + '*'
  })
}

console.log(desensitizeName('张'))




const reg = /^\d+\.\d\d(\d+)$/g

console.log(reg.test('11.123456'))
console.log('1111.123'.match(reg))
console.log('1111.12'.replace(reg, function(_, p1) {
  console.log(_)
  console.log(p1)
}))



function addUnit(value, unit = '') {
  const regexp = /^-?\d+(\.\d+)?$/
  return regexp.test(String(value)) ? value + 'px' : String(value).replace(/^(\d+)([\%|vw|vh|rpx|px])$/g, unit ? `$1${unit}` : '$1$2')
  // return regexp.test(String(value)) ? value + 'px' : String(value).replace(/^(\d+)(%|vw|vh|rpx|px)$/g, function(_, p1, p2) {
  //   console.log(_)
  //   console.log(p1)
  //   console.log(p2)
  //   return p1 + (unit || p2)
  // })
}

// console.log(addUnit(100))
// console.log(addUnit('100'))
// console.log(addUnit('100rpx'))
// console.log(addUnit('100%'))
// console.log(addUnit('100vh', '%'))
console.log(addUnit('100vw'))
