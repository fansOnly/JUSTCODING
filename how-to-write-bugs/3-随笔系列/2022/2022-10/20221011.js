/**
 *
 */
async function runParallel(fns, max = 2) {
  let ret = []
  const executing = []
  for (let i = 0; i < fns.length; i++) {
    let fn = fns[i]
    const p = Promise.resolve().then(() => fn())
    ret.push(p)

    if (fns.length >= max) {
      const e = p.then(() => executing.splice(executing.indexOf(e)), 1)
      executing.push(e)
      if (executing.length >= max) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

const sleep = timeout => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, timeout);
})

// const p1 = sleep(1000).then(console.log('1s p1'))
// const p2 = sleep(3000).then(console.log('3s p2'))
// const p3 = sleep(2000).then(console.log('2s p3'))
// const p4 = sleep(1000).then(console.log('1s p4'))
// runParallel([p1, p2, p3, p4])

const f1 = () =>
setTimeout(() => {
  console.log('f1');
}, 900);
const f2 = () => console.log('f2')
const f3 = () => setTimeout(() => {
  console.log('f3')
}, 1000);

const f4 = () => {
  let n = 0
  for (let i = 0; i < 10000; i++) {
    n += i
  }
  console.log('f4', n)
}
const f5 = () => {
  let n = 0
  for (let i = 0; i < 1000; i++) {
    n += i
  }
  console.log('f5', n)
}

const pre = performance.now()
runParallel([f3, f2, f1, f4, f5])
console.log(performance.now() - pre)
