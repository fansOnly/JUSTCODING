const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.resolve(3)

const asyncPromise = (fns = []) => {
  return fns.reduce((cur, next) => cur.then(() => next()), Promise.resolve())
}

const r1 = asyncPromise([p1,p2,p3])
console.log('r1: ', r1);



Function.prototype.myCall = function(context, ...args) {
  context = context || 'window'
  const fn = symbol();
  context[fn] = this;

  const res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.myApply = function(context = 'window', ...args) {
  const fn = symbol()
  context[fn] = this

  const res = context[fn](args)
  delete context[fn]
  return res
}