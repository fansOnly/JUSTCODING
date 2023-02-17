var v = new Promise((resolve) => {
  console.log('begin')
  resolve('then')
})

Promise.resolve(v).then((res) => {
  console.log(res)
})

new Promise((resolve) => {
  console.log(1)
  resolve()
})
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })
