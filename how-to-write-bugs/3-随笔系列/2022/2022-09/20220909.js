function transformDate(val, str = '-') {
  str = str.length === 1 ? [str, str, ''] : str
  return String(val).replace(/(\d{4})(\d{2})(\d{2})/, `$1${str[0]}$2${str[1]}$3${str[2]}`)
}


console.log(transformDate(20200202))
console.log(transformDate(20200202, '年月日'))
