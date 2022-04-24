const reg = value => {
  return value.replace(/(\d+\.\d{2})(\d+)$/, (_, p, p2) => {
    console.log(_)
    console.log(p)
    console.log(p2)
  })
}

console.log(reg('1111.1122'))


const isLeapYear = val => {
  return val % 100 === 0 ? val % 400 === 0 : val % 4 === 0
}

console.log(isLeapYear(1600))
