/*
 * @Author: fansonly
 * @Date: 2022-02-21 15:04:49
 * @Description:
 * @LastEditTime: 2022-02-22 15:39:25
 */
function test(a, b) {
  var x
  if (a > 1 && b < 10) {
    x = a - b
  }
  if (a == 2 || b > 20) {
    x = a + b
  }
  return x
}



function fn1(value, str) {
  var reg = new RegExp(str, 'g')
  return (value.match(reg) || []).length
}


console.log(fn1('abcadacacabsssssabddfffabbcbb', 'abddc'))


var x = 1
function fn(n) { n = n + 1 }
y = fn(x)
console.log(y)



function addjc(n) {
  function jc(n) {
    var j = 1;
    for (i = 1; i <= n; i++) {
      j = j * i;
    }
    return j;
  }
  var z = 0;
  for (k = 1; k <= n; k++) {
    z = z + jc(k);
  }
  return z;
}

console.log(addjc(5))




class A {
  static n = 5
  static method() {
    return n++
  }
}

class B extends A {
  constructor() {
    super()
    this.m = 10
  }
  method() {
    return this.m++
  }
}

const a = new B()
const b = new B()
console.log(a.method())
console.log(b.method())
