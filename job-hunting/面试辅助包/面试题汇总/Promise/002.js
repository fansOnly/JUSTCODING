var v = new Promise((resolve) => {
  console.log('begin')
  resolve('then')
})

new Promise((resolve) => {
  resolve(v)
}).then((v) => {
  console.log(v)
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
