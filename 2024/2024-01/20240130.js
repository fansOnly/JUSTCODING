function inheritPrototype(sup, sub) {
  const _proto = Object.create(sup.prototype)
  sub.prototype = _proto
  sub.prototype.constructor = sub;
}

function Human(name) {
  this.name = name
}
Human.prototype.say = function() {
  console.log(`my name is ${this.name}${this.age ? ', i am '+this.age+' years old.' : ''}`)
}

function Children(name, age) {
  this.name = name
  this.age = age
}

inheritPrototype(Human, Children)


const xiaoming = new Children('xiaoming', 13)
xiaoming.say();

const zhangsan = new Children('zhangsan')
zhangsan.say();