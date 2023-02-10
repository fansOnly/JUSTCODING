
const format = (val) => {
  return val.substring(0, 6) + ' ' + val.substring(6, 14) + ' ' + val.substring(14)
}

const format2 = val => {
  return val.replace(/(?!^)(?=(\d{3})+$)/g, ',')
}

console.log(format('362526199905120998'))
console.log(format2('362526199905120998'))
