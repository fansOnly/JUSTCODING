/**
 * 引用变量赋值
 * 1. 修改对象数据，原对象改变
 * 2. 指向新的对象，原对象不变
 */
var a = {
  age: 12
}
var b = a
a = {
  name: 'jack',
  age: 13
}

console.log(a, b)

function fn(obj) {
  obj = {
    age: 20
  }
}

fn(a)

console.log(a)



/**
 * 函数参数传递是值传递
 * 1. 基本值
 * 2. 地址值
 */
var a = 3
function fn(a) {
  a = a + 1
}

console.log(a)



/**
 * 函数执行完后
 * 1. 局部变量：自动释放内部的
 * 2. 对象变量：成为垃圾对象 -> 垃圾回收器自动回收
 */



/**
 * this
 * 1. 直接调用：window
 * 2. 对象调用：对象本身
 * 3. new 调用：构造函数
 * 4. call/apply/bind调用：指向的对象
 */


/**
 * 代码风格-分号
 * 1. 括号开头的前一句
 * 2. 中括号开头的前一句
 */



// [1,2] + [2,3]



// var name = "window"
// var obj = {
//   name: 'obj',
//   say: function () {
//     return function {
//       console.log(this.name)
//     }
//   }
// }

// var x = obj.say()
// x()


// var name = "window"
// var obj = {
//   name: 'obj',
//   say: function () {
  // var that = this
//     return function {
//       console.log(that.name)
//     }
//   }
// }

// var x = obj.say()
// x()


// var name = "window"
// var obj = {
//   name: 'obj',
//   say: function () {
//     return function {
//       console.log(this.name)
//     }
//   }
// }

// var x = obj.say().bind(o2)
// var o2 = {
//   name: 'o22222'
// }
// x()


// var name = "window"
// var obj = {
//   name: 'obj',
//   say: function () {
//     return () => {
//       console.log(this.name)
//     }
//   }
// }

// var x = obj.say().bind(o2)
// var o2 = {
//   name: 'o22222'
// }
// x()


// function fun(n, o) {
//   console.log(o)
//   return {
//     fun: function m(m) {
//       return fun(m, n)
//     }
//   }
// }

// var a = fun(0)
// a.fun(1)
// a.fun(2)
// a.fun(3)
// // undefined 0 0 0


// var b = fun(0).fun(1).fun(2).fun(3)
// // undefined 0 1 2

// var c = fun(0).fun(1)
// c.fun(2)
// c.fun(3)
// // undefined 0 1 1







// function Super(name) {
//   this.name = name
//   this.info = {
//     age: 18
//   }
// }
// Super.prototype.getSuper = function () {
//   console.log('getSuper', this.name, this.info)
// }
// function Sub(name) {
//   this.name = name
// }
// Sub.prototype = new Super()

// const sub1 = new Sub('sub1')
// console.log(sub1)
// sub1.getSuper()

// const sub2 = new Sub('sub2')
// sub2.info.age = 20
// sub1.getSuper()
// sub2.getSuper()
// console.log(sub1.info === sub2.info)




// function Super(name) {
//   this.name = name
//   this.info = {
//     age: 18
//   }
// }
// Super.prototype.getSuper = function () {
//   console.log('getSuper', this.name, this.info)
// }
// function Sub(name) {
//   Super.call(this, name)
// }
// Sub.prototype.getSub = function () {
//   console.log('getSub', this.name, this.info)
// }

// const sub1 = new Sub('sub1')
// console.log(sub1)
// sub1.getSub()

// const sub2 = new Sub('sub2')
// sub2.info.age = 25
// sub2.getSub()
// console.log(sub1.info === sub2.info)




// function Super(name) {
//     this.name = name
//   this.info = {
//     age: 18
//   }
// }
// Super.prototype.getSuper = function () {
//   console.log('getSuper', this.name, this.info)
// }
// function Sub(name) {
//   Super.call(this, name)
// }
// Sub.prototype = new Super()
// Sub.prototype.constructor = Sub
// Sub.prototype.getSub = function () {
//   console.log('getSub', this.name, this.info)
// }

// const sub1 = new Sub('sub1')
// console.log(sub1)
// sub1.getSuper()

// const sub2 = new Sub('sub2')
// sub2.info.age = 25
// sub2.getSub()
// console.log(sub1.info === sub2.info)




// function create(obj) {
//   function F() {}
//   F.prototype = obj
//   return new F()
// }

// const parent = {
//   name: 'parent',
//   info: {
//     age: 10
//   },
//   say: function() {
//     console.log(this.name, this.info)
//   }
// }

// const c1 = create(parent)
// console.log(c1)
// c1.say()
// const c2 = create(parent)
// c2.info.age = 25
// c2.say()
// console.log(c1.info === c2.info)






// function inheritObject(obj) {
//   const clone = Object.create(obj)

//   clone.say = function() {
//     console.log(this.name, this.info)
//   }

//   return clone
// }

// const parent = {
//   name: 'parent',
//   info: {
//     age: 18
//   }
// }

// const c1 = inheritObject(parent)
// const c2 = inheritObject(parent)

// console.log(c1)
// c1.say()

// c2.info.age = 25
// console.log(c2)
// c2.say()
// console.log(c1.info === c2.info)





// function Parent(name) {
//   this.name = name
//   this.info = {
//     age: 18
//   }
// }
// Parent.prototype.getParent = function () {
//   console.log('getParent', this.name, this.info)
// }
// function Child(name) {
//   Parent.call(this, name)
// }

// function inheritPrototype(sub, sup) {
//   const prototype = Object.create(sup.prototype)
//   sub.prototype = prototype
//   sub.prototype.constructor = sub
// }

// inheritPrototype(Child, Parent)

// const c1 = new Child('c1')
// console.log(c1)
// c1.getParent()

// const c2 = new Child('c2')
// c2.info.age = 25
// console.log(c2)
// c2.getParent()

// console.log(c1.info === c2.info)







//
