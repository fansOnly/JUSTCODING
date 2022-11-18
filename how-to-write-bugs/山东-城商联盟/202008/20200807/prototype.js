var Foo = function Foo() { }

var foo = new Foo()

console.log(foo)
console.log(Foo)

console.log(foo.__proto__)

console.log(foo.__proto__ === Foo.prototype)

console.log(Foo.prototype.__proto__ === Object.prototype)

console.log(Foo.prototype.constructor === Foo)

console.log(foo.constructor === Foo)



var obj = new Object()

console.log(obj)

console.log(Object)
console.log(typeof Object)

console.log(obj.__proto__ === Object.prototype)

console.log(obj.constructor === Object)

console.log(Object.prototype.constructor === Object)

console.log(Object.__proto__ === Function.prototype)

console.log(Object.__proto__.__proto__ === Object.prototype)

console.log(Object.__proto__.__proto__.__proto__ === null)


console.log(Function)

console.log(Function.__proto__ === Function.prototype)

console.log(Function.prototype.constructor === Function)

console.log(Foo.__proto__ === Function.prototype)
