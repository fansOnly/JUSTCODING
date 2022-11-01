Function.prototype.bind = function(context, ...args) {
  context = context || 'window'
  const self = this
  const fBound = function(...rest) {
    // 判断是直接调用还是通过 new 运算符调用
    return self.call(this instanceof self ? this : context, ...args, ...rest)
  }
  // 通过 new 运算符调用时绑定原型继承
  fBound.prototype = Object.create(self.prototype)
  return fBound
}

function Parent(name, age) {
  this.name = name
  this.age = age
}
Parent.prototype.say = function() {
  console.log(this.name)
  console.log(this.age)
}

function Child(name, age) {
  this.name = name
  this.age = age
}
Child.prototype.say = function() {
  console.log(this.name)
  console.log(this.age)
}

const parent = new Parent('p', 50)
// parent.say() // p 50
const child = new Child('c', 10)
// child.say() // c 10

const target = {
  name: 'f1',
  age: 22
}
const f1 = child.say.bind(target)
f1() // f1 22

const F = Child.bind({ name: 'k', age: 77 }, 'f2', 88)

const f2 = new F()
console.log(f2 instanceof Child) // true
f2.say() // f2 88
