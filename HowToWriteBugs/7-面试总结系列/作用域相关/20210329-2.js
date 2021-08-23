var x = 2
var y = {
  x: 3,
  z: (function(x) {
    this.x *= x
    x += 2
    return function(n) {
      this.x *= n
      x += 3
      console.log(x)
    }
  })(x)
}

var m = y.z
m(4) // x = 2 => x += 2 => x = 4 => x += 3 => x = 7

y.z(5) // 上次执行闭包产生的 x = 7 => x+=3 => x = 10

console.log(x, y.x, y.z) // 16 15 fn
