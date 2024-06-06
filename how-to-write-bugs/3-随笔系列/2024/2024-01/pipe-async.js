async function pipeAsync(arr, handler, max = 5) {
  let ret = []
  let executing = []
  const p = Promise.resolve();

  for (const item of arr) {
    ret.push(p.then(() => handler(item)))
  }
  
  if (ret.length > max) {
    const e = p.then(() => executing.splice(executing.indexOf(e), 1))
    executing.push(e)
    if (executing.length > max) {
      await Promise.race(executing)
    }
  }

  return Promise.all(ret)
}

const log = (str) => setTimeout(() => {
  console.log(str)
}, (str % 2) * 1000);

const arr = [1,2,3,4,5,6,7,8,9,10]


pipeAsync(arr, log, 3)