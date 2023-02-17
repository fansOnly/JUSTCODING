const duplication = arr => {
  return [...new Set(arr)]
}

const duplication2 = arr => {
  let res = []
  arr.forEach(item => {
    if (!res.includes(item)) {
      res.push(item)
    }
  })

  return res
}

const duplication3 = arr => {
  return arr.reduce((acc, cur) => acc.includes(cur) ? acc : acc.concat(cur), [])
}

const arr = [1, 2, 3, 5, 6, 4, 3, 5]

console.log(duplication(arr))
console.log(duplication2(arr))
console.log(duplication3(arr))
