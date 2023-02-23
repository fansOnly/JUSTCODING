const jobQueue = new Set()

const p = Promise.resolve()

let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}


const task1 = () => console.log('t1')
const task2 = () => console.log('t2')

jobQueue.add(task1).add(task2)

flushJob()
