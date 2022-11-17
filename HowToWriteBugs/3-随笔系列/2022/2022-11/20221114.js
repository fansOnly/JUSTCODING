class Interval {
  constructor() {
    this.run = false
    this.timerId = null
  }
  startInterval(fn, delay) {
    function interval() {
      if (!this.run) return
      this.timerId = setTimeout(interval.bind(this), delay);
      fn()
    }
    this.run = true
    this.timerId = setTimeout(interval.bind(this), delay);
  }
  stopInterval() {
    this.run = false
    clearTimeout(this.timerId)
    this.timerId = null
  }
}

const t = new Interval()
// t.startInterval(() => {
//   console.log(11111)
// }, 1000)
// setTimeout(() => {
//   console.log(2222)
//   t.stopInterval()
// }, 3000);
