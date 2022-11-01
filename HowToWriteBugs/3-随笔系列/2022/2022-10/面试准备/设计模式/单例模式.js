class Single {
  constructor(name) {
    this.name = name
  }
  static getInstance(name) {
    return this.instance || (this.instance = new Single(name))
  }
}

const t1 = Single.getInstance('t1')
console.log('t1: ', t1);
const t2 = Single.getInstance('t2')
console.log('t2: ', t2);
console.log(t1 === t2)
