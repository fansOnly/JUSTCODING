import { remove } from '../utils/util.js'

let uid = 0

export class Dep {
    constructor() {
        this.id = uid++
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        const subs = this.subs.slice()
        for (let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
    }
}

Dep.target = null
const targetStack = []

export function pushTarget(target) {
    targetStack.push(target)
    Dep.target= targetStack
}

export function popTarget() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}
