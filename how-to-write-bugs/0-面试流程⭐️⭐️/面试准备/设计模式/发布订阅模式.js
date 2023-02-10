class EventBus {
  constructor() {
    this.eventMap = new Map()
  }
  on(event, fn) {
    if (!this.eventMap.has(event)) {
      this.eventMap.set(event, [fn])
    } else {
      const events = this.eventMap.get(event) || []
      this.eventMap.set(event, events.concat(fn))
    }
  }
  emit(event, ...args) {
    if (!this.eventMap.has(event)) return
    const events = this.eventMap.get(event)
    events.forEach(fn => {
      fn.apply(this, args)
    })
  }
  off(event, fn) {
    if (!this.eventMap.has(event)) return
    const events = this.eventMap.get(event)
    this.eventMap.set(event, events.filter(item => item !== fn))
  }
  once(event, fn) {
    function f(...args) {
      fn(...args)
      this.off(event, f)
    }
    this.on(event, f)
  }
}

const evtbus = new EventBus()

function f1(a) {
  console.log('f1', a)
}
function f2(a) {
  console.log('f2', a)
}
function f3(a) {
  console.log('f3', a)
}

evtbus.on('change', f1)
evtbus.on('change', f2)
evtbus.on('click', f1)
evtbus.once('click', f3)
evtbus.once('click', f2)
console.log('evtbus: ', evtbus)

evtbus.emit('change', 'a')
evtbus.emit('click', 'a')

console.log('evtbus: ', evtbus)
