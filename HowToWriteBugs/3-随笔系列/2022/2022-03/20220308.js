/*
 * @Author: fansonly
 * @Date: 2022-03-08 19:50:57
 * @Description:
 * @LastEditTime: 2022-03-09 10:31:07
 */
const formatMoney = str => {
  return String(str).replace(/(?!^)(?=(\d{3})+$)/g, ',')
}

console.log(formatMoney('1234567890'))


const formatPhone = str => {
  return String(str).replace(/(?=(\d{4})+$)/g, '-')
}
console.log(formatPhone(13344445555))


const formatMobile = str => {
  return String(str).replace(/(?<=\d{3})\d+/g, ($0) => '-' + $0)
  .replace(/(?<=[\d-]{8})\d+/g, $0 => '-' + $0)
}
console.log(formatMobile(13))
console.log(formatMobile(1334))
console.log(formatMobile(1334444))
console.log(formatMobile(13344445))
console.log(formatMobile(13344445567))


/**
 * 密码长度是6-12位，由数字、小写字母和大写字母组成，但必须至少包括2种字符
 */
const checkPass = str => {
  // return /^\d+[a-z]+.+{6,12}$/.test(String(str))
}

// console.log(checkPass('12aaaaaa'))
// console.log(checkPass('1111111'))
// console.log(checkPass('aaaaaaa'))
// console.log(checkPass('1a1a'))
// console.log(checkPass('1a1a1a1a1a'))
// console.log(checkPass('1aaa111'))

/**
 * 提取连续重复的字符
 */
const collectRepeatStr = str => {
  const result = []
  const regExp = new RegExp(/(.+)\1+/, 'g')
  String(str).replace(regExp, function(match, $1) {
    result.push($1)
  })
  return result
}

console.log(collectRepeatStr('1012323454545666'))


/**
 * 实现一个trim函数
 */
const trim = str => {
  return String(str).replace(/^\s*|\s*$/g, '')
}

const trim2 = str => {
  return String(str).replace(/^\s*(.*)\s*$/g, '$1')
}

console.log(trim('  sss 1'))
console.log(trim2('  sss 1'))
