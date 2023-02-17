const printTable = () => {
  const arr = new Array(9).fill().map((_, index) => index + 1)
  let str = ''
  for (let i = 1; i <= arr.length; i++) {
    for (let j = 1; j <= i; j++) {
      str += `${j} * ${i} = ${j * i}  `
    }
    str += '\n'
  }
  return str
}

console.log(printTable())
