/**
 * 观察者模式
 */

class Subject {
    constructor() {
        this.state = 'init'
        this.observers = []
    }
    // 收集观察者
    attach(o) {
        this.observers.push(o)
    }
    // 状态变化
    setState(newState) {
        this.state = newState
        this.observers.map(o => o.update(this))
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }

    update(student) {
        console.log(this.name + '被通知了, 学生的状态是' + student.state)
    }
}

const student = new Subject('小黑')
const parent = new Observer('父母')
const teacher = new Observer('老师')

student.attach(parent)
student.attach(teacher)
student.setState('逃课')


/**
 * 发布订阅模式
 */

class EventEmitter {
    constructor() {
        this.events = []
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [callback]
        } else {
            this.events[eventName].push(callback)
        }
    }

    emit(eventName) {
        this.events[eventName] && this.events[eventName].map(cb => cb())
    }
}

const evt = new EventEmitter()

const work = () => {
    console.log('working...')
}
const money = () => {
    console.log('money...')
}
const play = () => {
    console.log('playing...')
}
evt.on('work', work)
evt.on('work', money)
evt.on('money', money)
evt.on('play', play)

console.log(evt.events)

evt.emit('work')
