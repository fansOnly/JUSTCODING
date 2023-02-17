function Foo() {
  getName = function () {
    return 1
  }
  return this
}
Foo.getName = function () {
  return 2
}
Foo.prototype.getName = function () {
  return 3
}
var getName = function () {
  return 4
}
function getName() {
  return 5
}

console.log(Foo.getName())

console.log(getName())

console.log(Foo().getName())

console.log(getName())

console.log(new Foo.getName())

console.log(new Foo().getName())

console.log(new new Foo().getName())
