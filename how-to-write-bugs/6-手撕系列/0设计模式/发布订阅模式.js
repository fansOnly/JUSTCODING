/**
 * 设计模式之发布订阅模式
 * 观察者  <=> 调度中心 <=>  发布者
 */

const wrappedFn = (fn, once = false) => ({callback: fn, once})

class EventEmitter {
    constructor() {
        this.events = new Map()
    }
    on(type, fn, once = false) {
        const handler = this.events.get(type)
        if (!handler) {
            this.events.set(type, wrappedFn(fn, once))
        } else if (handler && typeof handler.callback === 'function') {
            this.events.set(type, [handler, wrappedFn(fn, once)])
        } else {
            handler.push(wrappedFn(fn, once))
        }
    }
    off(type, fn) {
        const handler = this.events.get(type)
        if (!handler) return
        if (!Array.isArray(handler) && handler.callback === fn.callback) {
            this.events.delete(type)
        } else {
            for (let i = 0; i < handler.length; i++) {
                if (handler[i].callback === fn.callback) {
                    handler.splice(i , 1)
                    i--
                    if (handler.length === 1) this.events.delete(type)
                }
            }
        }
    }
    once(type, fn) {
        this.on(type, fn, true)
    }
    emit(type, ...args) {
        const handler = this.events.get(type)
        if (!handler) return
        if (Array.isArray(handler)) {
            handler.map(h => {
                h.callback.apply(this, args)
                if (h.once) this.off(type, h)
            })
        } else {
            handler.callback.apply(this. args)
            if (handler.once) this.off(type, handler)
        }
    }
    allOff(type) {
        if (this.events.has(type)) {
            this.events.delete(type)
        }
    }
}


const evt = new EventEmitter()

function fn1() {
    console.log('event1 is emited.')
}
function fn2() {
    console.log('event2 is emited.')
}

evt.on('event1', fn1)

evt.on('event2', fn2, true)

evt.emit('event1')

evt.emit('event1')

evt.emit('event2')
evt.emit('event2')

const once = () => console.log('eventC is emited once.')
evt.once('once', once)

evt.emit('once')
evt.emit('once')
