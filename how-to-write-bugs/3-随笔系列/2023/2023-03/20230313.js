

const arr = [1, 2, 3, 4, 5, 6]

arr.forEach(item => {
  console.log(item)
  if (item > 3) return
})
