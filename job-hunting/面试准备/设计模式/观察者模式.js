class Observer {
  constructor() {
    this.observers = new Set()
  }
  add(ob) {
    this.observers.add(ob)
  }

  notify() {
    this.observers.forEach(ob => ob.update())
  }
}

class Dep {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log(`${this.name} 被通知了...`)
  }
}

const observer = new Observer()

const lily = new Dep('Lily')
const bob = new Dep('Bob')

observer.add(lily)
observer.add(bob)

observer.notify()

