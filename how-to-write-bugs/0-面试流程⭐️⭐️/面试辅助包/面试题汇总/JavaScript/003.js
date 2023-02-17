var n = 2
var obj = {
  n: 3,
  fn: (function (n) {
    n *= 2
    this.n += 2
    var n = 5
    console.log('window.n', window.n)
    return function (m) {
      console.log('n:', n, 'm', m)
      this.n *= 2
      console.log(m + ++n)
    }
  })(n),
}

var fn = obj.fn
fn(3)
obj.fn(3)
console.log(n, obj.n)
