function _create(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}

Function.prototype._call = function(context, ...args) {
  context = context || 'window'
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](args)
  delete context[fn]
  return res
}

Function.prototype._apply = function(context, args) {
  context = context || 'window'
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](args)
  delete context[fn]
  return res
}

Function.prototype._bind = function(context, ...args) {
  context = context |  'window'
  let self = this
  const fBound = function() {
    return self.call(self instanceof fBound ? this : context, ...args, ...arguments)
  }
  fBound.prototype = Object.create(self.prototype)
  return fBound
}

const obj = {
  name: '11',
  fun() {
    console.log(this.name)
  }
}

const obj2 = { name: '22' }

obj.fun()

obj.fun._call(obj2)
obj.fun._apply(obj2)
obj.fun._bind(obj2)()


function A(name,) {
  this.name = name
}
A.prototype.say = function() {
  console.log(this.name)
}
function B(name) {
  this.name = name + 'xx'
}
B.prototype.say = function() {
  console.log(this.name+ '===')
}

const a = new A('a')
const b = new B('b')

a.say()

a.say._call(b)
a.say._apply(b)
a.say._bind(b)()


/**
 * 实现 new
 */
function _new(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const ret = Ctor.call(obj, ...args)
  return typeof ret === 'object' && ret !== null ? ret : obj
}

const b2 = _new(B, 'b2')

b2.say()
