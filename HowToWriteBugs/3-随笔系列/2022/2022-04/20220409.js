/*
 * @Author: fansonly
 * @Date: 2022-04-09 10:14:06
 * @Description:
 * @LastEditTime: 2022-04-13 10:36:11
 */


const transformData = str => {
  const numCN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  return String(str).replace(/(\d)/, (_, $1) => numCN[$1 - 1]).replace(/[Yy]/, '年').replace(/[Mm]/, '月').replace(/[Dd]/, '天')
}


export function checkPass(v) {
  return /^(?![-`=\[\];',.~!@#$%^&*()_+|{}:"?]+$)(?![0-9]+$)(?![A-Za-z]+$)[0-9a-zA-Z-`=\[\];',.~!@#$%^&*()_+|{}:"?]{8,16}$/.test(String(v))
  // return /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/.test(String(v))
}


console.log(checkPass('1234567'))

const formatDate = str => {
  return str.replace(/(?!^)(?=(\d{4})$)/g, '-')
}

console.log(formatDate('20220108'))
