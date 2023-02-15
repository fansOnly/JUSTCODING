class EventBus {
  constructor() {
    this.events = new Map()
  }

  on(name, fn) {
    if (this.events.has(name)) {
      const events = this.events.get(name)
      this.events.set(name, events.concat(fn))
    } else {
      this.events.set(name, [fn])
    }
  }

  emit(name, ...args) {
    if (this.events.has(name)) {
      const events = this.events.get(name)
      events.forEach(fn => fn.apply(this, args))
    }
  }

  off(name, fn) {
    if (!this.events.has(name)) return
    if (fn === undefined) {
      return this.events.delete(name)
    }
    let events = this.events.get(name)
    events = events.filter(item => item !== fn)
    if (events.length) {
      this.events.set(name, events)
    } else {
      this.events.delete(name)
    }
  }

  once(name, fn) {
    let self = this
    function f(...args) {
      fn(...args)
      self.off(name, f)
    }
    this.on(name, f)
  }
}

const evt = new EventBus()

function f1(a, b) {
  console.log('f1 + ' + a + ' : ' + b)
}
function f2() {
  console.log('f2')
}
function f3() {
  console.log('once f3')
}

evt.on('say', f1)
evt.on('say', f2)

evt.emit('say', 1, 2)
// evt.off('say', f2)

// evt.once('say2', f3)
// console.log('evt before emit: ', evt)
// evt.emit('say2')

console.log('evt: ', evt)
