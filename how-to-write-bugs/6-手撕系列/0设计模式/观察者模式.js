/**
 * 设计模式之观察者模式
 * 观察者和被观察者是耦合在一起的
 * 一对多
 */
class Subject {
    constructor() {
        this.observers = []
    }
    add(observe) {
        if (!this.observers.includes(observe)) {
            this.observers.push(observe)
        }
    }
    notify() {
        this.observers.forEach(ob => ob.update(...arguments))
    }
    remove(observe) {
        for (let i = 0, len = this.observers.length; i < len; i++) {
            if (this.observers[i] === observe) {
                this.observers.splice(i, 1)
            }
        }
    }
}

class Observe {
    constructor(name, score) {
        this.name = name
        this.score = score
    }
    update() {
        console.log(`${this.name} 考了 ${this.score} 分.`)
    }
}

const ob1 = new Observe('小明', 50)
const ob2 = new Observe('小红', 100)

const sub = new Subject()

sub.add(ob1)
sub.add(ob2)

sub.notify()
