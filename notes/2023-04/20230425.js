let timesArr = [];

const useTimes = () => {

  const addTimes = (cb, delay) => {
    timesArr.push(setTimeout(() => {
      cb()
    }, delay))
  }

  const clearTimes = () => {
    timesArr.forEach(t => {
      clearTimeout(t)
    })
  }

  return {
    addTimes,
    clearTimes
  }
}


const { addTimes, clearTimes } = useTimes()


let a = 10
function test() {
  addTimes(change, 1000)
}

function change() {
  a = 5
  console.log(a)
}

test()
console.log(a)
