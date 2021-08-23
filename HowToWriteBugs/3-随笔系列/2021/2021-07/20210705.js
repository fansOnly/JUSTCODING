/**
 *
 */

async function fn1() {
  await fn2()
  console.log('3333')
}

async function fn2() {
  console.log('2222')
}


fn1()

console.log(11111)


new Promise(resolve => {
  console.log(44444)
  resolve(5)
}).then(res => {
  console.log(res)
  return 0
})
