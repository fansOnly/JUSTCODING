/*
 * @Author: fansonly
 * @Date: 2022-03-11 15:59:27
 * @Description:
 * @LastEditTime: 2022-03-11 16:03:54
 */
/**
 * 姓名脱敏
 * @param {string} value 输入值
 * @param {boolean} blockLastName 是否屏蔽姓氏
 * @param {string} char 替换符号
 */
export const desensitizeName = (value, blockLastName = true, char = '*') => {
  return String(value).replace(/^([\u4e00-\u9fa5])([\u4e00-\u9fa5]*)([\u4e00-\u9fa5])$/, function (_, p1, p2, p3) {
    // return p2 ? p1 + char.repeat(p2.length) + p3 : p1 + '*'
    return p2 ? p1 + char.repeat(p2.length) + p3 : (blockLastName ? '*' + p3 : p1 + '*')
  })
}


console.log(desensitizeName('一二'))
console.log(desensitizeName('一二三'))
console.log(desensitizeName('一二', false))
console.log(desensitizeName('一二三', false))
