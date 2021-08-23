function A() {
  console.log(1)
}

function Fn() {
  A = function() {
    console.log(2)
  }
  return this
}

Fn.A = A // 赋值引用地址，指向的是输出 1 的函数

Fn.prototype = {
  A: () => {
    console.log(3)
  }
}

A() // 1
Fn.A() // 1
// Fn().A() // 全局的 A 函数被修改为输出2 2
// new Fn.A() // 1
// new Fn().A() // 3
// new new Fn().A() // 箭头函数不能被 new
