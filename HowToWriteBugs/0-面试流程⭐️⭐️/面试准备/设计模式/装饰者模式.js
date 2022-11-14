Function.prototype.before = function(fn) {
  const self = this
  return function() {
    fn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}
Function.prototype.after = function(fn) {
  const self = this
  return function() {
    self.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

function fn() {
  console.log('1111')
}

fn = fn.before(() => console.log('before')).after(() => console.log('after'))
fn()
