const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('p1')
  }, 1000);
})
p1.then(res => {
  console.log(res)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p2')
  }, 1500);
})
p2.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

const p3 = Promise.resolve('p3')
p3.then(res => {
  console.log(res)
})

const p4 = Promise.reject('p4')
p4.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

Promise.all([p1, p2, p3, p4]).then(res => {
  console.log(res)
})

Promise.race([p1, p2, p3, p4]).then(res => {
  console.log(res)
})

Promise.allSettled([p1, p2, p3, p4])
.then(res => {
  console.log(res)
})
