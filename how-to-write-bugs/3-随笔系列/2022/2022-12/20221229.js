function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}

const sleep = (delay = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const lighting = async () => {
  await sleep(3000)
  red()
  await sleep(2000)
  green()
  await sleep(1000)
  yellow()
  lighting()
}

lighting()

// const sleep2 = (delay, cb) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       cb()
//       resolve()
//     }, delay)
//   })
// }

// const lighting = () => {
//   Promise.resolve()
//     .then(() => {
//       return sleep2(3000, red)
//     }).then(() => {
//       return sleep2(2000, green)
//     }).then(() => {
//       return sleep2(1000, yellow)
//     }).then(() => {
//       lighting()
//     })
// }

// lighting()
