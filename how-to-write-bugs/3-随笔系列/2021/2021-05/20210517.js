Function.prototype.call2 = function(context, ...args) {
  context = context || window
  const fn = Symbol()
  context[fn] = this

  const result = context[fn](...args)
  delete context[fn]
  return result
}

const obj = {
  a: 1,
  say() {
    console.log(this.a)
  }
}

const o2 = {
  a: 10
}

obj.say.call2(o2)
