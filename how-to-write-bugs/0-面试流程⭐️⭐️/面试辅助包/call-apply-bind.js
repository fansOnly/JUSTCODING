Function.prototype.myCall = function (context, ...args) {
  context = context || 'window'
  const fn = Symbol()
  context[fn] = this

  const res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.myApply = function (context, args) {
  context = context || 'window'
  const fn = Symbol()
  context[fn] = this

  const res = context[fn](args)
  delete context[fn]
  return res
}

Function.prototype.myBind = function (context, ...args) {
  context = context || 'window'
  const self = this
  const fBound = function () {
    return self.apply(this instanceof fBound ? this : context, [...args, ...arguments])
  }
  if (this.prototype) {
    fBound.prototype = Object.create(this.prototype)
  }
  return fBound
}

function Parent(name) {
  this.name = name
}

Parent.prototype.say = function (age) {
  console.log(`I'm ${this.name} and i was ${age} years old.`)
}

const p1 = new Parent('p1', 10)

p1.say(10) // I'm p1 and i was 10 years old.
p1.say.myCall({ name: 'call' }, 20) // I'm call and i was 20 years old.
p1.say.myApply({ name: 'apply' }, 25) // I'm apply and i was 25 years old.

const p3 = p1.say.myBind({ name: 'bind' })
p3(35) // I'm bind and i was 35 years old.

const Parent2 = Parent.myBind(null, 'my bind Parent')
const p4 = new Parent2()
p4.say(44) // I'm my bind Parent and i was 44 years old.

const Parent3 = Parent.bind(null, 'bind Parent')
const p5 = new Parent3()
p5.say(55) // I'm bind Parent and i was 55 years old.
