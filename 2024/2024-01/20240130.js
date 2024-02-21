function myNew (Fn, args) {
  const obj = Object.create(Fn.prototype);
  const result = Fn.apply(obj, ...args)
  return typeof result === 'object' && result !== null ? result : obj;
}


function myApply (context = 'window', args) {
  const fn = Symbol();
  context[fn] = this

  const res = context[fn](args)
  delete context[fn]
  return res
}

function myCall(context = 'window', ...args) {
  const fn = Symbol()
  context[fn] = this

  const res = context[fn](...args)
  delete context[fn]
  return res
}

function myBind(context = 'window', ...args) {
  const self = this

  const fBound = function() {
    return self.apply(self instanceof fBound ? this : context, [...args, ...arguments])
  }

  function Noop() {}

  if (this.prototype) {
    Noop.prototype = this.prototype
  }
  fBound.prototype = new Noop()
  return fBound
}


function myCreate(proto) {
  function Fn() {}
  Fn.prototype = proto
  return new Fn()
}

function myInstanceOf(obj, source) {
  let _proto = Object.getPrototypeOf(obj)
  while (_proto) {
    if (_proto === source) return true
    _proto = Object.getPrototypeOf(_proto)
  }
  return false
}